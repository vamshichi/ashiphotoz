"use client"

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Pencil, Trash2, Eye } from 'lucide-react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface BaseItem {
  id: string
  title?: string
  name?: string
  imageUrl?: string
  image?: string
  category?: string
  description?: string
  content?: string | null
  rating?: number
  url?: string
} 