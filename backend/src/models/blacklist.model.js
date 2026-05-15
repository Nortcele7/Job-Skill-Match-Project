const mongoose = require("mongoose")


const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true, "token is required to be blacklist"]
    }
    
}, {
    timestamps: true        // This will store when was the token blacklist
})

const tokensBlacklistModel = mongoose.model("blacklistTokens", blacklistTokenSchema)

module.exports = tokensBlacklistModel