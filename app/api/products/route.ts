import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(products)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, description, price, status, category, image } = data

    // Find or create category
    let categoryRecord = await prisma.category.findFirst({
      where: { name: category }
    })

    if (!categoryRecord) {
      categoryRecord = await prisma.category.create({
        data: {
          name: category,
          slug: category.toLowerCase().replace(/\s+/g, '-')
        }
      })
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description,
        price: parseFloat(price),
        stockStatus: status === 'In Stock' ? 'IN_STOCK' : 'OUT_OF_STOCK',
        categoryId: categoryRecord.id
      },
      include: {
        category: true
      }
    })

    // Add image if provided
    if (image) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: image,
          alt: product.name,
          sortOrder: 0
        }
      })
    }

    return NextResponse.json(product)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
