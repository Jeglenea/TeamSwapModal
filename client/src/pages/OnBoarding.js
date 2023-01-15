import Nav from '../components/Nav'
import {useState} from 'react'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        show_gender: false,
        gamer_identity: "FPS",
        gamer_interest: "TPS",
        url: "",
        about: "",
        matches: []

    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', {formData})
            console.log(response)
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => {
                }}
                showModal={false}
            />

            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type='text'
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Game Types You Like</label>
                        <div className="multiple-input-container">
                            <input
                                id="FPS-gamer-identity"
                                type="radio"
                                name="gamer_identity"
                                value="FPS"
                                onChange={handleChange}
                                checked={formData.gamer_identity === "FPS"}
                            />
                            <label htmlFor="FPS-gamer-identity">FPS</label>
                            <input
                                id="TPS-gamer-identity"
                                type="radio"
                                name="gamer_identity"
                                value="TPS"
                                onChange={handleChange}
                                checked={formData.gamer_identity === "TPS"}
                            />
                            <label htmlFor="TPS-gamer-identity">TPS</label>
                            <input
                                id="MOBA-gamer-identity"
                                type="radio"
                                name="gamer_identity"
                                value="MOBA"
                                onChange={handleChange}
                                checked={formData.gamer_identity === "MOBA"}
                            />
                            <label htmlFor="MOBA-gamer-identity">MOBA</label>
                        </div>

                        <label htmlFor="show-gender">Show Gender on my Profile</label>

                        <input
                            id="show-gender"
                            type="checkbox"
                            name="show_gender"
                            onChange={handleChange}
                            checked={formData.show_gender}
                        />

                        <label>Game Types Your Match Will Like</label>

                        <div className="multiple-input-container">
                            <input
                                id="FPS-gamer-interest"
                                type="radio"
                                name="gamer_interest"
                                value="FPS"
                                onChange={handleChange}
                                checked={formData.gamer_interest === "FPS"}
                            />
                            <label htmlFor="FPS-gamer-interest">FPS</label>
                            <input
                                id="TPS-gamer-interest"
                                type="radio"
                                name="gamer_interest"
                                value="TPS"
                                onChange={handleChange}
                                checked={formData.gamer_interest === "TPS"}
                            />
                            <label htmlFor="TPS-gamer-interest">TPS</label>
                            <input
                                id="MOBA-gamer-interest"
                                type="radio"
                                name="gamer_interest"
                                value="MOBA"
                                onChange={handleChange}
                                checked={formData.gamer_interest === "MOBA"}
                            />
                            <label htmlFor="MOBA-gamer-interest">MOBA</label>

                        </div>

                        <label htmlFor="about">About me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="I like long walks..."
                            value={formData.about}
                            onChange={handleChange}
                        />

                        <input type="submit"/>
                    </section>

                    <section>

                        <label htmlFor="url">Profile Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div>


                    </section>

                </form>
            </div>
        </>
    )
}
export default OnBoarding
