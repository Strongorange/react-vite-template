import styled, { keyframes } from "styled-components"

const shimmer = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`

const Skeleton = styled.div<{
  $width: string
  $height: string
  $borderRadius?: string
}>`
  display: flex;
  flex-shrink: 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${({ $borderRadius }) => $borderRadius || "4px"};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`

export default Skeleton
