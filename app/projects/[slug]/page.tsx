import Link from "next/link"
import { ArrowLeft, Github, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeSnippet from "@/components/code-snippet"
import VideoPlayer from "@/components/video-player"
import ImageGallery from "@/components/image-gallery"

// This would typically come from a database or CMS
const projects = {
  "custom-rocket": {
    title: "Custom Mach 1 Rocket",
    description: "Fully custom solid-state rocket with custom remote ignitors and parachute deployment system.",
    longDescription:
      "I built and launched a rocket equipped with a custom altimeter and a wireless launch system, successfully breaking the sound barrier. To power the rocket, I developed APCP rocket fuel from scratch, formulating unique mixtures tailored to our specific rocket specifications. I also designed and fabricated a custom converging-diverging nozzle and casing, optimizing them for reusability and ease of manufacturing. To validate performance, I constructed a test stand to measure thrust and compare results with simulations. It was awesome.",
    tags: ["KiCad", "Onshape", "OpenRocket", "Microcontrollers", "Rocket Propellant"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    videoUrl: "https://example.com/video.mp4", // Replace with actual video URL
    codeSnippets: [
      {
        language: "javascript",
        title: "Product API",
        code: `// Product API Route
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one product
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Create product
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inventory: req.body.inventory
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

module.exports = router;`,
      },
    ],
    liveUrl: "https://www.youtube.com/watch?v=p_gHWFGRnWY&ab_channel=HenrySpeiser",
    repoUrl: "https://github.com/hspeiser/rocket-development",
  },
  // Add more projects here with similar structure
  "social-dashboard": {
    title: "Social Media Dashboard",
    description: "Analytics dashboard for tracking engagement across multiple social platforms.",
    longDescription:
      "This dashboard aggregates data from multiple social media platforms to provide a comprehensive view of social media performance. It tracks metrics such as engagement, reach, follower growth, and content performance. The dashboard includes customizable widgets, automated reporting, and data visualization tools to help users understand their social media impact.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "API Integration"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    videoUrl: "https://example.com/video.mp4",
    codeSnippets: [
      {
        language: "typescript",
        title: "Data Fetching",
        code: `// Data fetching with SWR
import useSWR from 'swr';

interface SocialStats {
  platform: string;
  followers: number;
  engagement: number;
  reach: number;
  growth: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useSocialStats() {
  const { data, error, isLoading } = useSWR<SocialStats[]>('/api/social-stats', fetcher, {
    refreshInterval: 60000, // Refresh every minute
  });

  return {
    stats: data,
    isLoading,
    isError: error,
  };
}`,
      },
    ],
    liveUrl: "https://social-dashboard-demo.vercel.app",
    repoUrl: "https://github.com/yourusername/social-dashboard",
  },
  // Add more projects as needed
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug]

  if (!project) {
    return (
      <div className="container px-4 py-12 md:px-6 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Project not found</h1>
        <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 md:px-6">
      <Link
        href="/#projects"
        className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{project.longDescription}</p>
          <div className="flex flex-wrap gap-4 mb-8">
            {project.liveUrl && (
              <Button className="flex items-center gap-2" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <img
            src={project.images[0] || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <Tabs defaultValue="gallery" className="mt-12">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="gallery">Image Gallery</TabsTrigger>
          <TabsTrigger value="video">Video Demo</TabsTrigger>
          <TabsTrigger value="code">Code Snippets</TabsTrigger>
        </TabsList>
        <TabsContent value="gallery">
          <ImageGallery images={project.images} alt={project.title} />
        </TabsContent>
        <TabsContent value="video">
          <VideoPlayer videoUrl={project.videoUrl} title={project.title} />
        </TabsContent>
        <TabsContent value="code">
          <div className="space-y-8">
            {project.codeSnippets.map((snippet, index) => (
              <CodeSnippet key={index} language={snippet.language} title={snippet.title} code={snippet.code} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

