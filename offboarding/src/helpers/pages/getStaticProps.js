export default async function getStaticProps({ params }) {
  return {
    props: {
      tenantName: params?.tenant || null,
      flow: params?.flow || null,
    },
  };
}
