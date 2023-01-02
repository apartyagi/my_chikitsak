import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
    phone: {
        unique: true,
        type: String,
    },
    otp: {
        type: String,
    },
    gender:String,
    image:{
        type: String,
        default:'https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg'
    },
    name: String,
    email: String,
    address: String,
    password: String,
    mciNo: String,
    aadharNo: String,
    experience: String,
    speciality: String,
    range:String,
    fees:String,
    lat:String,
    lng:String,
    currentLocation:String,
    serviceType: {
        type: String,
        enum: ['online', 'offline', 'both']
    },
    servieDays: {
        "sunday": {
            "type": [
                "Number"
            ]
        },
        "monday": {
            "type": [
                "Number"
            ]
        },
        "tuesday": {
            "type": [
                "Number"
            ]
        },
        "wednesday": {
            "type": [
                "Number"
            ]
        },
        "thursday": {
            "type": [
                "Number"
            ]
        },
        "friday": {
            "type": [
                "Number"
            ]
        },
        "saturday": {
            "type": [
                "Number"
            ]
        }
    },
    createdAt: String,
    status: Boolean,
    verified: Boolean,
    reverified: Boolean,
    profileCompleted: Boolean,
})

const doctorModel = mongoose.model('Doctor', doctorSchema);

export default doctorModel;