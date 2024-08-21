const admin = require("firebase-admin")
const serviceAccount = require("./serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

async function updateDocuments() {
  try {
    const usersCollection = db.collection("userdata")
    const usersSnapshot = await usersCollection.get()
    const batch = db.batch()

    usersSnapshot.forEach((doc) => {
      const userData = doc.data()
      const { weeklyCompletedSessions, plan } = userData
      const sessions = plan.sessions

      if (weeklyCompletedSessions === sessions) {
        // Increment perfectStreak by 1
        batch.update(doc.ref, {
          perfectStreak: admin.firestore.FieldValue.increment(1),
          weeklyCompletedSessions: 0, // Reset sessions
        })
      } else {
        // Reset perfectStreak to 0
        batch.update(doc.ref, {
          perfectStreak: 0,
          weeklyCompletedSessions: 0, // Reset sessions
        })
      }
    })

    await batch.commit()
    console.log("Reset process complete.")
  } catch (error) {
    console.error("Error updating documents: ", error)
  }
}

updateDocuments()
