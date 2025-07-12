import type { Tutorial, GlossaryTerm } from './types';

export const tutorials: Tutorial[] = [
  {
    id: '1',
    slug: 'introduction-to-docker',
    title: 'Introduction to Docker',
    description: 'Learn the fundamentals of Docker, from containers to images and basic commands.',
    content: `
# Welcome to Docker!

This tutorial covers the basics of Docker.

## What is a Container?

A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.

## Key Docker Commands

- \`docker run\`: Runs a command in a new container.
- \`docker ps\`: Lists containers.
- \`docker build\`: Builds an image from a Dockerfile.
    `,
    author: 'Admin User',
    publishedDate: '2024-05-20',
  },
  {
    id: '2',
    slug: 'ci-cd-with-github-actions',
    title: 'CI/CD with GitHub Actions',
    description: 'Set up a complete CI/CD pipeline for your projects using GitHub Actions.',
    content: `
# CI/CD with GitHub Actions

Automate your workflow from code to deployment.

## Creating Your First Workflow

A workflow is a configurable automated process that will run one or more jobs. Workflows are defined by a YAML file checked in to your repository.

## Important Concepts

- **Events**: A specific activity that triggers a workflow.
- **Jobs**: A set of steps that execute on the same runner.
- **Actions**: A reusable unit of code.
    `,
    author: 'Admin User',
    publishedDate: '2024-05-22',
  },
  {
    id: '3',
    slug: 'kubernetes-basics',
    title: 'Kubernetes Basics',
    description: 'Understand the core concepts of Kubernetes for orchestrating containers at scale.',
    content: `
# Kubernetes Basics

This tutorial will introduce you to Kubernetes.

## What is Kubernetes?

Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.

## Core Components

- **Pods**: The smallest deployable units of computing that you can create and manage in Kubernetes.
- **Services**: An abstract way to expose an application running on a set of Pods as a network service.
- **Deployments**: Manages a set of replicated Pods.
    `,
    author: 'Admin User',
    publishedDate: '2024-05-25',
  },
  {
    id: '4',
    slug: 'infrastructure-as-code-with-terraform',
    title: 'Infrastructure as Code with Terraform',
    description: 'Learn how to provision and manage your cloud infrastructure using Terraform.',
    content: `
# Infrastructure as Code with Terraform

Manage infrastructure with configuration files.

## Why Terraform?

Terraform allows you to build, change, and version infrastructure safely and efficiently.

## Basic Commands

- \`terraform init\`: Initializes a working directory.
- \`terraform plan\`: Creates an execution plan.
- \`terraform apply\`: Executes the actions proposed in a Terraform plan.
    `,
    author: 'Admin User',
    publishedDate: '2024-05-28',
  },
];

export const featuredTutorials = tutorials.slice(0, 3);

export const glossaryTerms: GlossaryTerm[] = [
  { id: '1', term: 'CI/CD', definition: 'Continuous Integration and Continuous Delivery (or Deployment) is a set of practices for automating the software development and release process.' },
  { id: '2', term: 'Containerization', definition: 'The process of packaging an application and its dependencies into a standardized unit for software development, called a container.' },
  { id: '3', term: 'Docker', definition: 'A platform for developing, shipping, and running applications in containers.' },
  { id: '4', term: 'Kubernetes (K8s)', definition: 'An open-source container orchestration platform for automating the deployment, scaling, and management of containerized applications.' },
  { id: '5', term: 'Infrastructure as Code (IaC)', definition: 'The management of infrastructure (networks, virtual machines, load balancers, and connection topology) in a descriptive model, using the same versioning as DevOps team uses for source code.' },
  { id: '6', term: 'YAML', definition: 'A human-readable data serialization standard that is often used for configuration files.' },
  { id: '7', term: 'Microservices', definition: 'An architectural style that structures an application as a collection of loosely coupled services, which implement business capabilities.' },
];
