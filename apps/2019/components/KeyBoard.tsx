import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { keydownHandler } from "../utils";

import type MoveStructure from "../canvasItems/MoveStructure";
import type RisingStructure from "../canvasItems/RisingStructure";
import type Structure from "../canvasItems/Structure";
import type User from "../canvasItems/User";
import type { CanvasState } from "myTypes";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #00000090;
  border-top-left-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 3;
`;

const Content = styled.div`
  margin: 3px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Key = styled.div<{ isPressed: boolean }>`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
  border: 3px solid ${(props) => (props.isPressed ? "white" : "gray")};
  background-color: transparent;
  color: ${(props) => (props.isPressed ? "white" : "gray")};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const Description = styled.div`
  color: gray;
  margin-right: 5px;
  &::after {
    content: " : ";
  }
`;

export default function KeyBoard({
  user,
  changeTitle,
  structures,
}: {
  user: User;
  changeTitle: CanvasState.setTitleFn;
  structures: (MoveStructure | Structure | RisingStructure)[];
}) {
  const initValue = {
    space: false,
    enter: false,
    left: false,
    right: false,
    bottom: false,
    top: false,
  };
  const [pressed, setPressed] = useState(initValue);

  const clickHandler = (type: string) => {
    keydownHandler(user, changeTitle, structures)({ code: type } as KeyboardEvent);
  };

  useEffect(() => {
    window.addEventListener("keyup", () => {
      setPressed(initValue);
    });
    window.addEventListener("keydown", (e) => {
      const { code } = e;
      switch (code) {
        case "Enter":
          setPressed(() => ({ ...initValue, enter: true }));
          break;
        case "Space":
          setPressed(() => ({ ...initValue, space: true }));
          break;
        case "ArrowLeft":
          setPressed(() => ({ ...initValue, left: true }));
          break;
        case "ArrowRight":
          setPressed(() => ({ ...initValue, right: true }));
          break;
        case "ArrowUp":
          setPressed(() => ({ ...initValue, top: true }));
          break;
        case "ArrowDown":
          setPressed(() => ({ ...initValue, bottom: true }));
          break;
        default:
          break;
      }
    });
  }, []);

  return (
    <Container>
      <Content>
        <Description>들어가기 / 사이트이동</Description>
        <Key isPressed={pressed.enter} onClick={() => clickHandler("Enter")}>
          En
        </Key>
      </Content>
      <Content>
        <Description>상세보기 / 물고기잡기</Description>
        <Key isPressed={pressed.space} onClick={() => clickHandler("Space")}>
          Sp
        </Key>
      </Content>
      <Content>
        <Description>왼쪽으로 이동</Description>
        <Key isPressed={pressed.left} onClick={() => clickHandler("ArrowLeft")}>
          L
        </Key>
      </Content>
      <Content>
        <Description>오른쪽으로 이동</Description>
        <Key isPressed={pressed.right} onClick={() => clickHandler("ArrowRight")}>
          R
        </Key>
      </Content>
      <Content>
        <Description>위쪽으로 이동</Description>
        <Key isPressed={pressed.top} onClick={() => clickHandler("ArrowUp")}>
          U
        </Key>
      </Content>
      <Content>
        <Description>아래쪽으로 이동</Description>
        <Key isPressed={pressed.bottom} onClick={() => clickHandler("ArrowDown")}>
          D
        </Key>
      </Content>
    </Container>
  );
}
