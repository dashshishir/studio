import type { Tutorial, GlossaryTerm } from './types';

// Tutorials are now fetched from Firestore

export const glossaryTerms: GlossaryTerm[] = [
  { id: '1', term: 'CI/CD', definition: 'Continuous Integration and Continuous Delivery (or Deployment) is a set of practices for automating the software development and release process.' },
  { id: '2', term: 'Containerization', definition: 'The process of packaging an application and its dependencies into a standardized unit for software development, called a container.' },
  { id: '3', term: 'Docker', definition: 'A platform for developing, shipping, and running applications in containers.' },
  { id: '4', term: 'Kubernetes (K8s)', definition: 'An open-source container orchestration platform for automating the deployment, scaling, and management of containerized applications.' },
  { id: '5', term: 'Infrastructure as Code (IaC)', definition: 'The management of infrastructure (networks, virtual machines, load balancers, and connection topology) in a descriptive model, using the same versioning as DevOps team uses for source code.' },
  { id: '6', term: 'YAML', definition: 'A human-readable data serialization standard that is often used for configuration files.' },
  { id: '7', term: 'Microservices', definition: 'An architectural style that structures an application as a collection of loosely coupled services, which implement business capabilities.' },
];
