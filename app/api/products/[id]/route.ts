import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { name, description, price, stock, status, category } = data

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

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description,
        price: parseFloat(price),
        stockStatus: status === 'In Stock' ? 'IN_STOCK' : 'OUT_OF_STOCK',
        categoryId: categoryRecord.id
      },
      include: {
        category: true,
        images: true
      }
    })

    return NextResponse.json(product)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
