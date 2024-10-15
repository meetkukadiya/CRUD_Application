import User from "../model/userModel.js"

export const create = async(req, res) => {
    try {

        const userData = new User(req.body); 
        if(!userData){
            return res.status(404).json({msg: "User Data not found"});
        }
        const savedData = await userData.save();
        res.status(200).json({data: savedData, msg: "User created Successfully"});
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const getAll = async(req, res) => {
    try {
        const userData = await User.find();
        if(!userData){
            return res.status(404).json({msg: "User data not found"});
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const getOne = async(req, res) => {
    try {
        const id = req.params.id;
        const userExists = await User.findById(id);
        if(!userExists){
            return res.status(404).json({msg : "User not found"});
        }
        res.status(200).json(userExists);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const update = async(req, res) => {
    try {
        const id = req.params.id;
        const userExists = await User.findById(id);
        if(!userExists){
            return res.status(401).json({msg : "User not found"});
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({data: updatedData, msg: "User updated!"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const userExists = await User.findById(id);
        if(!userExists){
            return res.status(404).json({msg: "User not exist"})
        }  
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted successfully"})

    } catch (error) {
        res.status(500).json({error: error});
    }
}