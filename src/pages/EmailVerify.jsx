import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Cookies from "js-cookie";
import { userContext } from "../context/AppProvider";
import NotFound from "./NotFound";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(false);
	const {setUser}= useContext(userContext);
	const param = useParams();
	const verifyEmailUrl = async () => {
		try {
			const url = `${import.meta.env.VITE_API_URL}/users/${param.id}/verify/${param.token}`;
			const {data} = await axios.get(url);
			console.log(data);
			if(data.valideUrl){
				setValidUrl(true);
				setUser(data.user)
				Cookies.set("auth", data.token, { expires: 7 });
			}
			
		} catch (error) {
			console.log(error);
			setValidUrl(false);
		}
	};
	useEffect(() => {
		verifyEmailUrl();
	}, [param]);

	return (
		<>
			{validUrl ? (
				<div className="success_cont">
					
					<h1>The email has been <br/> successfully verified</h1>
					<Link to="/">
						<button className="success_btn">back to home</button>
					</Link>
				</div>
			) : (
				<NotFound/>
			)}
		</>
	);
};

export default EmailVerify;