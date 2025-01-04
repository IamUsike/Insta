import mongoose, {Schema} from "mongoose"

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        password:{
            type: String
        }
    }
)

export const User = mongoose.model("User", userSchema)