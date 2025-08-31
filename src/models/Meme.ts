import mongoose from "mongoose";

const MemeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

if (mongoose.models.Meme) {
    delete mongoose.models.Meme
}

const Meme = mongoose.model("Meme", MemeSchema);

export default Meme;