"use client"

import { useEffect } from "react"
import posthog from "posthog-js"

export default function PostHogInit() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
    if (!key || posthog.__loaded) return

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      defaults: "2025-05-24",
      capture_pageview: "history_change",
      capture_pageleave: true,
      capture_heatmaps: true,
      autocapture: true,
    })
  }, [])

  return null
}
