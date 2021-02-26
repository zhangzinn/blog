import { GetStaticProps, NextPage } from 'next';
import path from 'path';
import { promises as fs } from 'fs';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

type Props = {
  posts: {
    date: string;
    title: string;
    fileName: string;
  }[];
};

const Home: NextPage<Props> = ({ posts }) => {
  const router = useRouter();

  return (
    <div id='post-list-container'>
      {posts.map(({ date, title, fileName }) => (
        <div
          key={date}
          className='card'
          onClick={e => {
            e.preventDefault();
            router.push(`/posts/${fileName.replace('.md', '')}`);
          }}>
          <span className='date'>
            {dayjs(date).format('YYYY-MM-DD HH:mm (ddd)')}
          </span>
          {title}
        </div>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const markdownDir = path.resolve(process.cwd(), 'data');
  const fileNames = await fs.readdir(markdownDir);

  const posts = fileNames.map(fileName => {
    const date = fileName.split('_')[0];
    const title = fileName.replace('.md', '').replace(/^[\d]{14}_/, '');
    return { date, title, fileName };
  });
  posts.sort((a, b) => Number(b.date) - Number(a.date));

  return {
    props: {
      posts,
    },
  };
};

export default Home;
