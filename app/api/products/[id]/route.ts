import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { name, description, price } = data

    // Update only fields defined in the Prisma Product model
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        price: parseFloat(price)
      }
    })

    return NextResponse.json(product)
  } catch (error: unknown) {
    console.error(error)
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
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
