function centerXRScene(session, renderer, camera) {
    if (session) {
      const baseReferenceSpace = renderer.xr.getReferenceSpace()

      const offsetPosition = camera.position

      const offsetRotation = camera.quaternion

      const transform = new XRRigidTransform(offsetPosition, {
        x: 0,
        y: offsetRotation.y,
        z: 0,
        w: offsetRotation.w,
      })
      const teleportSpaceOffset =
        baseReferenceSpace.getOffsetReferenceSpace(transform)

      renderer.xr.setReferenceSpace(teleportSpaceOffset)
    }
}

export default centerXRScene