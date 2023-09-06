import { useEffect, useRef } from "react"
import styled from "styled-components"

import ControllerTile from "@components/ControllerTile/ControllerTile"

import { useStore } from "@state/store"
import globalStyles from "@data/globalStyles"
import useHeadsetState from "@utils/useHeadsetState"

function ControllerSideBar() {
  const intervalRef = useRef<null | number>(null)
  const usersRef = useRef<any>()
  const socket = useStore((s) => s.socket)
  const [users, setUsers] = useHeadsetState()
  const tiles = Object.values(users)

  useEffect(() => {
    socket &&
      socket.on("receive-test", (data) => {
        if (data.type === "update") {
          setUsers({ ...data.value })
          return
        }
      })
  }, [socket])

  useEffect(() => {
    usersRef.current = users
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        const time = Date.now()
        for (const user in usersRef.current) {
          const current = usersRef.current[user]
          if (current.online) {
            const difference = Math.abs((current.lastConnected - time) / 1000)
            if(difference >= 5){
              setUsers({
                type: "online",
                user: user,
                value: false
              })
            }
          }
        }
      }, 5000)
    } 
  }, [users])

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  return (
    <SideBarWrapper>
      {tiles.map((info, i) => {
        return (
          <Tile key={`tile${i}`}>
            <ControllerTile data={info} />
          </Tile>
        )
      })}
    </SideBarWrapper>
  )
}

export default ControllerSideBar

const SideBarWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 20vh;
  background-color: ${globalStyles.colors.dark.main};
  border-right: 0.2rem solid ${globalStyles.colors.dark.accent};
  box-shadow: 0rem 0.3rem 5rem ${globalStyles.colors.dark.accent}99;
  display: flex;
  flex-direction: column;
`

const Tile = styled.div`
  position: relative;
  height: calc(100% / 7);
  width: 100%;
  background-color: ${globalStyles.colors.dark.main};
  border-bottom: 0.1rem solid ${globalStyles.colors.dark.accent}99;

  :last-of-type {
    border-bottom: none;
  }
`
