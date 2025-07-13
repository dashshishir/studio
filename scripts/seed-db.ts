
require('dotenv/config');
const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
import type { CollectionReference } from 'firebase-admin/firestore';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const db = getFirestore();

const tutorials = [
  {
    title: 'Introduction to Docker',
    slug: 'introduction-to-docker',
    description: 'Learn the fundamentals of Docker, including containers, images, and basic commands.',
    author: 'DevOpsHub Admin',
    publishedDate: new Date().toISOString(),
    content: `
      <h2>What is Docker?</h2>
      <p>Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Images:</strong> A read-only template with instructions for creating a Docker container.</li>
        <li><strong>Containers:</strong> A runnable instance of an image.</li>
        <li><strong>Dockerfile:</strong> A text document that contains all the commands a user could call on the command line to assemble an image.</li>
      </ul>

      <pre class="ql-syntax" spellcheck="false"><code># Example Docker command
docker run hello-world
</code></pre>
      <p>This command downloads a test image and runs it in a container. When the container runs, it prints an informational message and exits.</p>
    `,
  },
  {
    title: 'Getting Started with Kubernetes',
    slug: 'getting-started-with-kubernetes',
    description: 'An introductory guide to Kubernetes for container orchestration.',
    author: 'DevOpsHub Admin',
    publishedDate: new Date().toISOString(),
    content: `
      <h2>Welcome to Kubernetes</h2>
      <p>Kubernetes, also known as K8s, is an open-source system for automating deployment, scaling, and management of containerized applications.</p>

      <h3>Core Components</h3>
      <ol>
        <li><strong>Pods:</strong> The smallest deployable units of computing that you can create and manage in Kubernetes.</li>
        <li><strong>Services:</strong> An abstract way to expose an application running on a set of Pods as a network service.</li>
        <li><strong>Deployments:</strong> A controller that provides declarative updates for Pods and ReplicaSets.</li>
      </ol>
      <p>Understanding these components is the first step to mastering Kubernetes.</p>
    `,
  },
  {
    title: 'CI/CD with GitHub Actions',
    slug: 'ci-cd-with-github-actions',
    description: 'Automate your development workflow with GitHub Actions for seamless CI/CD.',
    author: 'DevOpsHub Admin',
    publishedDate: new Date().toISOString(),
    content: `
      <h2>Automating with GitHub Actions</h2>
      <p>GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub.</p>
      
      <h3>Example Workflow</h3>
      <p>A simple workflow to run tests on every push to the main branch:</p>
      <pre class="ql-syntax" spellcheck="false"><code>name: CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Run a one-line script
      run: echo Hello, world!
</code></pre>
      <p>This YAML file defines a workflow that is triggered on a push event and runs a simple echo command.</p>
    `,
  },
];

const glossary = [
    {
        term: "Containerization",
        definition: "The process of packaging an application and its dependencies into a standardized unit for software development, called a container."
    },
    {
        term: "Orchestration",
        definition: "The automated management, scaling, and deployment of containerized applications. Kubernetes is a popular orchestration tool."
    },
    {
        term: "Continuous Integration (CI)",
        definition: "The practice of frequently merging all developer working copies to a shared mainline. Each integration is verified by an automated build to detect integration errors as quickly as possible."
    },
    {
        term: "Continuous Delivery (CD)",
        definition: "A software engineering approach in which teams produce software in short cycles, ensuring that the software can be reliably released at any time."
    },
    {
        term: "Infrastructure as Code (IaC)",
        definition: "The management of infrastructure (networks, virtual machines, load balancers, and connection topology) in a descriptive model, using the same versioning as DevOps team uses for source code."
    }
];

async function seedCollection(collection: CollectionReference, data: any[]) {
    const snapshot = await collection.limit(1).get();
    if (!snapshot.empty) {
        console.log(`Collection ${collection.id} is not empty. Skipping seeding.`);
        return;
    }

    console.log(`Seeding collection: ${collection.id}...`);
    const batch = db.batch();
    data.forEach((item: any) => {
        const docRef = collection.doc(); // Automatically generate a new document ID
        batch.set(docRef, item);
    });

    await batch.commit();
    console.log(`Seeded ${data.length} documents into ${collection.id}.`);
}


async function main() {
  console.log('Starting database seed process...');
  try {
    await seedCollection(db.collection('tutorials'), tutorials);
    await seedCollection(db.collection('glossary'), glossary);
    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

main();
