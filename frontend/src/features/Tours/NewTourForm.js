import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewTourMutation } from "./toursApiSlice"
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DateTimePicker from 'react-datetime-picker'

const NewTourForm = ({usstates, mxstates, countries, lengths}) => {

    const [addNewTour, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTourMutation()

    const navigate = useNavigate()

    const [tourname, setTourName ] = useState("")
    const [country, setCountry ] = useState("US")
    const [availableStates, setAvailableStates ] = useState(usstates)
    const [selectedState, setSelectedState ] = useState("US-NY")
    const [startdate, setStartDate] = useState(new Date());
    const [enddate, setEndDate] = useState(new Date());
    const [lengthInDays, setLengthInDays] = useState(1)
    const [participants, setParticipants] = useState(7)

    useEffect(() => {
        if (isSuccess) {
            setTourName('')
            setCountry('US')
            setAvailableStates(usstates)
            setSelectedState("")
            setStartDate(new Date())
            setEndDate(new Date())
            setLengthInDays(1)
            setParticipants(0)
            navigate('/home')
        }
    }, [isSuccess, navigate])

    const canSave = [tourname].every(Boolean) && !isLoading
    const errClass = isError ? "errmsg" : "offscreen"
    let disableStates = false
    const hotSpots = []
    const active = false

    const onSaveTourClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            console.log({country})
            await addNewTour(
                {   tourname, 
                    country, 
                    countryState: selectedState, 
                    hotSpots,
                    startdate, 
                    enddate,
                    lengthInDays,
                    participants,
                    active
                })
        }
    }

    const countryOptions = countries.map(country => {
        return (
            <option
                key={country.code}
                value={country.code}
            > {country.name}
            </option >
        )
    })

    const lengthOptions = lengths.map(l => {
        return (
            <option
                key={l.code}
                value={l.code}
            > {l.name}
            </option >
        )
    })

    const stateOptions = availableStates.map(st => {
        return (
            <option
                key={st.code}
                value={st.code}
            > {st.name}
            </option >
        )
    })
    
    const onTourNameChanged = (e) => {setTourName(e.target.value)}
    const onLengthInDaysChanged = (e) => {setLengthInDays(e.target.value)}
    const onCountryChanged = (e) => {
        setCountry(e.target.value)
        switch (e.target.value) {
            case "US":
                setAvailableStates(usstates)
                break;
            case "MX":
                setAvailableStates(mxstates)
                break;
            default:
                setSelectedState("")
                setAvailableStates([])
                disableStates=true
                break;
        }
    }

    const onStateChanged = (e) => {setSelectedState(e.target.value)}
    const onParticipantsChanged = (e) => {setParticipants(e.target.value)}

        const content = 
            <>
            <Container>
                <p className={errClass}> {error?.data?.message}</p>

                <Form onSubmit={onSaveTourClicked}>

                <Form.Group className="mb-3">
                    <Form.Label>Tour Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter tour name"
                        name="tourname"
                        value={tourname}
                        onChange={onTourNameChanged}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Select 
                        aria-label="Select Country"
                        name="country"
                        onChange={onCountryChanged}
                        >
                            {countryOptions}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>State/Province</Form.Label>
                    <Form.Select 
                        aria-label="Select State/Region"
                        name="selectedState"
                        // value="us"
                        onChange={onStateChanged}
                        disabled={disableStates}
                        >
                            {stateOptions}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tour Start Date</Form.Label>

                    <DateTimePicker
                        nativeInputAriaLabel="End date"
                        onChange={setStartDate}
                        name="startdate"
                        value={startdate}
                    />                
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tour End Date</Form.Label>

                    <DateTimePicker
                        nativeInputAriaLabel="End date"
                        onChange={setEndDate}
                        name="enddate"
                        value={enddate}
                    />                
                </Form.Group>

                <Form.Group>
                    <label>Length of Tour</label>
                    <select 
                        aria-label="Enter Length in Days"
                        name="lengthInDays"
                        value={lengthInDays}
                        onChange={onLengthInDaysChanged}
                        >
                            {lengthOptions}
                    </select>
                </Form.Group>
                <Form.Group>
                    <label>Participants</label>
                    <input 
                        type="text"
                        name="participants"
                        value={participants}
                        onChange={onParticipantsChanged}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>

            </Container>
            </>

    return content 
}
export default NewTourForm