import { User } from "../Models/UserModel.js";

export const addToLikedMovies = async (req, res) => {
    try {
        const { email, data } = req.body;
        console.log(email, data);
        const user = await User.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(user.id,
                    { likedMovies: [...user.likedMovies, data] },
                    { new: true });
            } else {
                return res.json({
                    success: false,
                    message: "Movie already present in liked list"
                })
            }
        } else {
            await User.create({ email, likedMovies: [data] });
        }
        return res.json({ message: "Movie added successfully" });
    } catch(e) {
        return res.json({ message: "Something went wrong" });
    } 
}

export const getMyList = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (user) {
            return res.json({
                success: "true",
                movies : user.likedMovies
            })
        } else {
            return res.json({ message: "User not found" });
        }
    } catch (e) {
        return res.json({success : 'false'})
    }
}