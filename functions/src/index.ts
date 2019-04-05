import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()

exports.onDestroyUser = functions.auth.user().onDelete(user => {
  return afterDestroyUser(user.uid)
})

exports.onDeleteFridgeAuth = functions.firestore
  .document('fridgeAuths/{fridgeID}')
  .onDelete((snap, _) => {
    return afterDeleteFridgeAuth(snap.id)
  })

exports.onDeleteStage = functions.firestore
  .document('fridges/{fridgeID}/stages/{stageID}')
  .onDelete((_, context) => {
    return afterDeleteStage(context.params.fridgeID, context.params.stageID)
  })

exports.onDeleteLane = functions.firestore
  .document('fridges/{fridgeID}/lanes/{laneID}')
  .onDelete((_, context) => {
    return afterDeleteLane(context.params.fridgeID, context.params.laneID)
  })

async function afterDestroyUser(userID: string) {
  const snap = await db
    .collection('fridgeAuths')
    .where('ownerID', '==', userID)
    .get()
  const batch = db.batch()
  snap.docs.forEach(doc => batch.delete(doc.ref))
  await batch.commit()
}

async function afterDeleteStage(fridgeID: string, stageID: string) {
  const snap = await db
    .collection(`fridges/${fridgeID}/items`)
    .where('stageID', '==', stageID)
    .get()
  const batch = db.batch()
  snap.docs.forEach(doc => batch.delete(doc.ref))
  await batch.commit()
}

async function afterDeleteLane(fridgeID: string, laneID: string) {
  const snap = await db
    .collection(`fridges/${fridgeID}/items`)
    .where('laneID', '==', laneID)
    .get()
  const batch = db.batch()
  snap.docs.forEach(doc => batch.delete(doc.ref))
  await batch.commit()
}

async function afterDeleteFridgeAuth(fridgeID: string) {
  const fridgePath = `fridges/${fridgeID}`
  await db.doc(fridgePath).delete()
  await batchDeleteCollection(`${fridgePath}/stages`)
  await batchDeleteCollection(`${fridgePath}/lanes`)
}

async function batchDeleteCollection(path: string) {
  const snap = await db.collection(path).get()
  const batch = db.batch()
  snap.docs.forEach(doc => batch.delete(doc.ref))
  await batch.commit()
}
