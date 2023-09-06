import { Dispatch, useReducer } from "react"

type TInitialObject = {
  tablet: boolean
  inSession: boolean
  currentTour: number
  color: string
  online: boolean
  lastConnected: null | number
}

type TUsers = {
  [key: number] : TInitialObject
}

type TActions = {
  type: "session" | "online"
  value: boolean
  user: number | string
} | {
  type: "tour"
  value: number
  user: number | string
} | {
  type: "reset"
} 

const initialState: TUsers = {
  0: {
    tablet: true,
    inSession: false,
    currentTour: 0,
    color: "green",
    online: false,
    lastConnected: null
  },
  1: {
    tablet: true,
    inSession: false,
    currentTour: 0,
    color: "red",
    online: false,
    lastConnected: null
  },
  2: {
    tablet: false,
    inSession: false,
    currentTour: 0,
    color: "yellow",
    online: false,
    lastConnected: null
  },
  3: {
    tablet: false,
    inSession: false,
    currentTour: 0,
    color: "blue",
    online: false,
    lastConnected: null
  },
  4: {
    tablet: false,
    inSession: false,
    currentTour: 0,
    color: "white",
    online: false,
    lastConnected: null
  },
  5: {
    tablet: false,
    inSession: false,
    currentTour: 0,
    color: "green",
    online: false,
    lastConnected: null
  },
  6: {
    tablet: false,
    inSession: false,
    currentTour: 0,
    color: "red",
    online: false,
    lastConnected: null
  }
}

function useHeadsetState(): [TUsers, Dispatch<TActions>] {
  
  function handleFilterObj(object: TUsers, action: TActions): TUsers {
    switch (action.type) {
      case "reset":
        return object
      case "session":
        let updatedSession = {
          ...object,
          [action.user] : {
            ...object[action.user],
            inSession: action.value
          }
        }
        return updatedSession
      case "online":
        let updatedConnection
          updatedConnection = {
            ...object,
            [action.user] : {
              ...object[action.user],
              online: action.value,
              lastConnected: Date.now()
            }
          }
        return updatedConnection
      case "tour":
        let updatedTour = {
          ...object,
          [action.user] : {
            ...object[action.user],
            currentTour: action.value
          }
        }
        return updatedTour
      default:
        return object
    }
  }
  const [usersObject, setUsersObject] = useReducer(handleFilterObj, initialState)

  return [usersObject, setUsersObject]
}

export default useHeadsetState

