import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const userSchema = new Schema(
    {
        name: {
            type: String,
            reqyured: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        profilePicUrl: {
            type: String,
            trim: true,
        },
        credentials: {
            google: {
                accessToken: {
                    type: String,
                    trim: true,
                },
                id: {
                    type: String,
                    trim: true,
                },
            },
            direct: {
                accessToken: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },
        },
    },
    { timestamps: true, id: false, collection: "users" },
);

userSchema.plugin(paginate);

export default model("User", userSchema);
