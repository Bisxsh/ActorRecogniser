Actor Recogniser

![App Landing Page GIF](/readme2.gif)

**A web application for instant actor identification and filmography discovery.**

This repository contains the source code for Actor Recogniser, a full-stack, progressive web application engineered to provide instant actor identification from a user-provided image. The system is designed as a performant, microservice-based platform that processes images and returns identified actors along with their discography.

**Architectural Overview**  
The application is built around a lean, optimised pipeline:

- Image Ingestion: The client provides an image from a local device, via drag-and-drop, camera, or from the clipboard.
- Client-Side Pre-processing: The user utilises a client-side cropping tool to isolate faces, reducing the data payload sent to the backend and ensuring search accuracy.
- Microservice-Based Identification: The processed image is sent to a dedicated backend service for facial recognition. The system retrieves and formats the actor's filmography for display on the frontend.

This streamlined process addresses the common user frustration of having to perform multiple search queries across different platforms to identify an actor and find their filmography.

**Technology Stack**

Frontend:

- Next.js
- React
- Tailwind CSS
- GSAP

Backend:

- Rust (Actix-Web)
- tRPC
- Docker
- AWS
- Google Cloud Run

**Technical Details**

- SSG/CSR with Lazy Hydration: A hybrid architecture is used to provide performance boosts and reduce LCP to account for GSAP overheads.
- FFmpeg: Employed for server-side optimisation of video assets, ensuring the hero video is compressed and formatted for high-performance streaming
- Docker: The backend service is containerised for consistent, portable, and reliable deployment across different environments.
- Serverless: The Docker container is deployed to a serverless platform for cost-effective, auto-scaling resource management.

**Live Demo**  
You can try the application for yourself here:

[actor-recogniser.vercel.app](https://actor-recogniser.vercel.app)
