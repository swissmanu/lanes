import styled from "styled-components";

interface IntroProps {}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #858585;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
  opacity: 0.2;
  font-weight: 800;
  font-size: 50px;
  margin-bottom: 50px;
`;

const Hotkeys = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 8px;
`;

const Hotkey = styled.dd`
  text-align: right;
`;

const Key = styled.span`
  border: 1px solid gray;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 1px 4px;
  border-radius: 4px;
  font-size: 90%;
`;

const Modifier = styled(Key)``;

const Intro: React.FC<IntroProps> = () => {
  return (
    <Layout>
      <Content>
        <Title>Lanes</Title>
        <Hotkeys>
          <dt>Open Board</dt>
          <Hotkey>
            <Modifier>Cmd</Modifier>
            <Key>O</Key>
          </Hotkey>
          <dt>New Board</dt>
          <Hotkey>
            <Modifier>Cmd</Modifier>
            <Key>N</Key>
          </Hotkey>
        </Hotkeys>
      </Content>
    </Layout>
  );
};
export default Intro;
