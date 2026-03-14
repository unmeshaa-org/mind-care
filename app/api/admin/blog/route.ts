import { NextResponse } from 'next/server';
import { createBlog, deleteBlog, getBlogs, updateBlog } from '../../../../services/blog';

export async function GET() {
  const posts = await getBlogs(false);
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const post = await createBlog(body);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { slug, updates } = body;

  if (!slug || !updates) {
    return NextResponse.json({ error: 'Missing slug or updates' }, { status: 400 });
  }

  try {
    const post = await updateBlog(slug, updates);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  try {
    await deleteBlog(slug);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
