interface PostData {
  title: string,
  slug: string,
  description: string,
  author: string,
  authorSlug: string,
  publishedAt: string,
  category: string,
  categorySlug: string,
}

interface Post extends PostData {
  body: Object[],
  imageUrl: string
}
// *[_type == 'post']{publishedAt, "author": author->name, "authorSlug":author->slug.current, "slug": slug.current, "cateogry": category->title, "categorySlug": category->slug.current, body}
interface Batch {
  name: string,
  slug: string,
  description: string
}

interface ExamLink {
  name: string,
  link: string,
  category: string
}

interface PostCategory {
  title: string,
  description: string,
  slug: string
}

interface Author {
  name: string,
  slug: string,
  bio: string,
  facebook: string,
  email: string,
  phone: string,
  imageUrl: string
}
