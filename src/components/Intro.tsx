import styled from "styled-components";

interface IntroProps {}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Intro: React.FC<IntroProps> = () => {
  return (
    <Layout>
      <div>
        <h1>Lanes</h1>
        <ul>
          <li>Open Board Cmd+O</li>
          <li>New Board Cmd+N</li>
        </ul>
      </div>
    </Layout>
  );
};
export default Intro;
