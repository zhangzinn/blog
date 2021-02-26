import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

type Props = {
  title: string;
  contents: string;
};

const Post: NextPage<Props> = ({ contents }) => {
  const renderers = {
    code: ({ language, value }) => {
      return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
    },
  };

  return (
    <div>
      <ReactMarkdown plugins={[gfm]} renderers={renderers}>
        {contents}
      </ReactMarkdown>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const markdownDir = path.resolve(process.cwd(), 'data');
  const fileNames = await fs.readdir(markdownDir);

  const paths = fileNames.map(fileName => ({
    params: { slug: `${fileName.replace('.md', '')}` },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const fileName = `${params.slug}.md`;
  const markdownDir = path.resolve(process.cwd(), 'data');
  const fileContents = await fs.readFile(`${markdownDir}/${fileName}`, 'utf8');

  return {
    props: {
      title: fileName.replace('.md', '').replace(/^[\d]{8}_[\d]+_/, ''),
      contents: fileContents,
    },
  };
};

export default Post;
