import { Fragment } from "react"
import styled from "styled-components"
import { useTransition } from "@react-spring/core"
import { a } from "@react-spring/three"

import ARLabel from "@components/ARLabel/ARLabel"

import { useStore } from "@state/store"
import labelsData from "@data/labelsData"

function Labels() {
  const ARLabels = useStore((s) => s.ARLabels)

  const transition = useTransition(ARLabels, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <Fragment>
      {transition(
        (anm, loaded) =>
          loaded.includes("sites") && (
            <Group>
              {labelsData.sites.map((obj, i) => {
                return (
                  <Fragment key={`label01${i}`}>
                    <ARLabel
                      rotation={obj.rotation}
                      path={obj.path}
                      distance={obj.distance}
                      distanceFactor={70}
                      altitude={obj.altitude}
                      image={obj.image}
                      opacity={anm.opacity}
                    />
                  </Fragment>
                )
              })}
            </Group>
          )
      )}
      {transition(
        (anm, loaded) =>
          loaded.includes("culture") && (
            <Group>
              {labelsData.culture.map((obj, i) => {
                return (
                  <Fragment key={`label02${i}`}>
                    <ARLabel
                      rotation={obj.rotation}
                      path={obj.path}
                      distance={obj.distance}
                      distanceFactor={70}
                      altitude={obj.altitude}
                      image={obj.image}
                      opacity={anm.opacity}
                    />
                  </Fragment>
                )
              })}
            </Group>
          )
      )}
      {transition(
        (anm, loaded) =>
          loaded.includes("transport") && (
            <Group>
              {labelsData.transport.map((obj, i) => {
                return (
                  <Fragment key={`label03${i}`}>
                    <ARLabel
                      rotation={obj.rotation}
                      path={obj.path}
                      distance={obj.distance}
                      distanceFactor={70}
                      altitude={obj.altitude}
                      image={obj.image}
                      opacity={anm.opacity}
                    />
                  </Fragment>
                )
              })}
            </Group>
          )
      )}
      {transition(
        (anm, loaded) =>
          loaded.includes("other") && (
            <Group>
              {labelsData.other.map((obj, i) => {
                return (
                  <Fragment key={`label04${i}`}>
                    <ARLabel
                      rotation={obj.rotation}
                      path={obj.path}
                      distance={obj.distance}
                      distanceFactor={70}
                      altitude={obj.altitude}
                      image={obj.image}
                      opacity={anm.opacity}
                    />
                  </Fragment>
                )
              })}
            </Group>
          )
      )}
    </Fragment>
  )
}

export default Labels

const Group = styled(a.group)``
