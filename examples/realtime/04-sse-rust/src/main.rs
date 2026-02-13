use axum::{
    response::sse::{Event, Sse},
    routing::get,
    Router,
};
use rand::Rng;
use serde::{Deserialize, Serialize};
use std::{convert::Infallible, net::SocketAddr, time::Duration};
use tokio_stream::{wrappers::IntervalStream, Stream, StreamExt};
use tower_http::{
    cors::{Any, CorsLayer},
    services::ServeDir,
};

#[derive(Debug, Serialize, Deserialize)]
struct ServerMetrics {
    timestamp: String,
    cpu_usage: f32,
    memory_mb: u32,
    disk_io: f32,
    network_in: u32,
    network_out: u32,
    active_connections: u32,
    requests_per_sec: u32,
    avg_response_time: u32,
    error_rate: f32,
}

impl ServerMetrics {
    fn generate() -> Self {
        let mut rng = rand::thread_rng();

        Self {
            timestamp: chrono::Local::now().format("%H:%M:%S").to_string(),
            cpu_usage: rng.gen_range(10.0..95.0),
            memory_mb: rng.gen_range(2000..12000),
            disk_io: rng.gen_range(5.0..85.0),
            network_in: rng.gen_range(100..5000),
            network_out: rng.gen_range(100..3000),
            active_connections: rng.gen_range(50..500),
            requests_per_sec: rng.gen_range(100..2000),
            avg_response_time: rng.gen_range(50..300),
            error_rate: rng.gen_range(0.0..5.0),
        }
    }
}

async fn metrics_stream() -> Sse<impl Stream<Item = Result<Event, Infallible>>> {
    let stream = IntervalStream::new(tokio::time::interval(Duration::from_millis(1000)))
        .map(|_| {
            let metrics = ServerMetrics::generate();
            let json = serde_json::to_string(&metrics).unwrap();

            Event::default().data(json)
        })
        .map(Ok);

    Sse::new(stream).keep_alive(
        axum::response::sse::KeepAlive::new()
            .interval(Duration::from_secs(1))
            .text("keep-alive"),
    )
}

#[tokio::main]
async fn main() {
    // CORS layer for SSE
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    // Build router
    let app = Router::new()
        .route("/api/metrics", get(metrics_stream))
        .nest_service("/", ServeDir::new("static"))
        .layer(cors);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));

    println!(
        r#"
╔═══════════════════════════════════════════════╗
║   Silcrow Server Metrics - Rust Example      ║
╚═══════════════════════════════════════════════╝

🚀 Server running at http://{}
📊 Metrics endpoint: http://{}/api/metrics

Press Ctrl+C to stop
        "#,
        addr, addr
    );

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
