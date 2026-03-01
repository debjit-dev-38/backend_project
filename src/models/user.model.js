import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken" // bearer token- like a key, whoever has this data is sent to it
import bcrypt from "bcrypt"
const userSchema= new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        avatar:{
            type:String, //cloudinary
            required:true,
        },
        coverImage:{
            type:String, //cloudinary
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:true,

        },
        refreshToken:{
            type:String,

        }

    },
    {
        timestamps:true
    }
)

userSchema.pre("save", async function () {
    if(!this.isModified("password")) return;

    this.password=await bcrypt.hash(this.password, 10)

})

userSchema.methods.isPasswordCorrect=async function(password)
{
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken=function(){ //access tokens are short lived. Done wherever authentication is required
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){ //refresh tokens are long lived.Some tasks dont require auth everytime thats why refresh is used
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User", userSchema) 