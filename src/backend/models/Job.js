import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    location: String,
    salary: String,
    description: String,
    contact: String,
    timing: String,
    hrtiming:String,
    gender: String,
    qualification: String,
    experience: String,
  },
  { timestamps: true }
);

 const  Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
 export default Job;
