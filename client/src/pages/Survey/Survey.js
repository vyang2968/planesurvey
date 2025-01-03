import { Container, Card, Form, Button } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup' 
import { number, object, string, array } from 'yup'
import Select from 'react-select';
import ErrorMessage from '../../components/ErrorMessage';
import classNames from 'classnames'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../components/ErrorModal';

function Survey() {
    const planes = [
        {value: 'a220', label: 'A220'},
        {value: 'a320', label: 'A230'},
        {value: 'a330', label: 'A330'},
        {value: 'a340', label: 'A340'},
        {value: 'a350', label: 'A350'},
        {value: 'a380', label: 'A380'},
        {value: 'b737', label: 'B737'},
        {value: 'b747', label: 'B747'},
        {value: 'b757', label: 'B757'},
        {value: 'b767', label: 'B767'},
        {value: 'b777', label: 'B777'},
        {value: 'b787', label: 'B787'}
    ]
    const airlines = ['American Airlines', 'United Airlines', 'Delta Airlines', 'Frontier Airlines', 'Spirit Airlines', 'Alaska Air', 'Southwest Airlines', 'Jetblue Airlines'];

    const sectionStyle = 'w-full my-[3%] pt-[2%] pb-[3%] flex flex-col items-center rounded-xl bg-white text-soft-black';
    const labelStyle = 'block mb-0.5 text-md font-semibold text-indigo';
    const rowStyle = 'w-11/12 m-[1%] grid grid-flow-col';
    const boxFocusedStyle = 'ring-blue-300 ring ring-2'
    const boxFocusStyle = 'focus:ring-blue-300 focus:ring focus:ring-2'
    const inputStyle = 'w-full px-2 h-3/5 rounded-lg text-xs lg:text-base outline-none border-none ring-none hover:ring-blue-300 hover:ring hover:ring-2 focus:placeholder-opacity-100 bg-light-gray shadow-sm'
    const boxErrorStyle = 'ring-red-600 ring ring-2';
    const inputErrorStyle = inputStyle + ' ' + boxErrorStyle;
    const errorStyle = 'w-full h-3 text-red-600 text-[0.5em] lg:text-xs pt-0.2 lg:pt-0.5 italic'

    const schema = object().shape({
        firstName: string().required('empty field').min(1, 'must be at least 1'),
        lastName: string().required('empty field').min(1, 'must be at least 1'),
        email: string().required('empty field').email('must be a valid email'),
        age: number().typeError('must be a number').required('empty field').positive().integer('must be a integer').min(18, 'must be at least 18'),
        manufacturer: string().required('must select one'),
        airplane: string().required('must pick one'),
        airlines: array().min(1, 'must select at least one'),
        response: string().required('empty field').min(1, 'must be at least 1')
    });

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const ref = useRef(null);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        setIsSubmitting(true);
        ref.current.continuousStart(30, 150);
        
        axios.post(
            '/responses/create',
            data,
            {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'API-KEY': process.env.REACT_APP_API_KEY
                },
                withCredentials: true 
            }
        )
        .then((res) => {
            ref.current.complete();
            setTimeout(() => {
                navigate("/submitted");
                reset();
            }, 900)
            console.log("server response", res.status);
        })
        .catch((error) => {
            ref.current.complete();
            setTimeout(() => {
                setShowModal(true)
            }, 900)
            console.error("error:", error.response?.data || error.message);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <>
            <Helmet>
                <title>Plane Survey</title>
                <meta name='description' content='survey for everything aviation related' />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="shortcut icon" type="image/png" href={''} />
            </Helmet>
            <LoadingBar 
                ref={ref} 
                color='#2563eb' 
                shadow={false} 
                height={3} 
            />
            <Container 
                className={classNames(
                    'min-w-dvw min-h-dvh flex justify-center items-center text-black m-0 p-0 overflow-hidden',
                    "relative before:absolute before:inset-0 before:bg-[url('assets/plane.jpg')] before:bg-no-repeat before:bg-cover before:bg-left-bottom before:bg-local before:blur before:z-[-1] before:bg-left-bottom",
                    'before:bg-white before:opacity-60'
                )}
            >
                <CustomModal 
                    isOpen={showModal} 
                    onClose={() => setShowModal(false)} 
                    className='w-full h-full' 
                />
                <Card className='min-w-3/5 w-4/5 lg:w-3/5 h-auto rounded-3xl my-[5%] flex justify-center items-center bg-soft-gray'>
                    <Card.Body className='w-5/6 py-[5%] text-indigo'>
                        <Container className='w-full text-center pb-[3%]'>
                            <Card.Title className='text-3xl mb-1 lg:mb-0.5 lg:text-5xl font-bold'>Plane Survey</Card.Title>
                            <Card.Subtitle className='text-xs lg:text-base text-charcoal'>Please fill out the fields below with the required information</Card.Subtitle>
                        </Container>
                        <Form noValidate className='w-full flex flex-col items-center text-base lg:text-lg' onSubmit={handleSubmit(onSubmit)}>
                            <Container className={sectionStyle}>
                                <Container className='w-11/12 m-[1%] flex justify-between mb-[2%]'>
                                    <Form.Group className='w-[48%]'>
                                        <Form.Label className={labelStyle}>First Name</Form.Label>
                                        <Controller 
                                            control={control} 
                                            name='firstName'
                                            defaultValue=''
                                            render={({field: {onChange, onBlur, value, ref}}) => (
                                                <Form.Control
                                                    placeholder='Chuck'
                                                    className={classNames(
                                                        boxFocusStyle,
                                                        errors.firstName ? inputErrorStyle : inputStyle
                                                    )}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        />
                                        <ErrorMessage error={errors.firstName} className={errorStyle}/>
                                    </Form.Group>

                                    <Form.Group className='w-[48%]'>
                                        <Form.Label className={labelStyle}>Last Name</Form.Label>
                                        <Controller 
                                            control={control} 
                                            name='lastName'
                                            defaultValue=''
                                            render={({field: {onChange, onBlur, value, ref}}) => (
                                                <Form.Control 
                                                    placeholder='Yeager'
                                                    className={classNames(
                                                        boxFocusStyle,
                                                        errors.lastName ? inputErrorStyle : inputStyle
                                                    )}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        />
                                        <ErrorMessage error={errors.lastName} className={errorStyle}/>
                                    </Form.Group>
                                </Container>
                                <Container className='w-11/12 m-[1%] flex justify-between'>
                                    <Form.Group className='w-[80%]'>
                                        <Form.Label className={labelStyle}>Email</Form.Label>
                                        <Controller 
                                            control={control} 
                                            name='email'
                                            defaultValue=''
                                            render={({field: {onChange, onBlur, value, ref}}) => (
                                                <Form.Control 
                                                    type='email'
                                                    placeholder='cyeager1947@example.com'
                                                    className={classNames(
                                                        boxFocusStyle,
                                                        errors.email ? inputErrorStyle : inputStyle
                                                    )}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        >
                                        </Controller>
                                        <ErrorMessage error={errors.email}  className={errorStyle} />
                                    </Form.Group>
                                    <Form.Group className='w-2/12'>
                                        <Form.Label className={labelStyle}>Age</Form.Label>
                                        <Controller 
                                            control={control} 
                                            name='age'
                                            defaultValue=''
                                            render={({field: {onChange, onBlur, value, ref}}) => (
                                                <Form.Control 
                                                    type='number'
                                                    placeholder='18'
                                                    min='18'
                                                    max='125'
                                                    className={classNames(
                                                        boxFocusStyle,
                                                        errors.age ? inputErrorStyle : inputStyle
                                                    )}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        >
                                        </Controller>
                                        <ErrorMessage error={errors.age} className={errorStyle}/>
                                    </Form.Group>
                                </Container>
                            </Container>
                            <Container className={sectionStyle + ' pt-[3%]'}>
                                <Container className={rowStyle}>
                                    <Form.Group className='w-full'>
                                        <Form.Label className={labelStyle}>Airbus or Boeing?</Form.Label>
                                        <Controller
                                            control={control}
                                            name='manufacturer'
                                            defaultValue=''
                                            render={({field: {onChange, value, ref}}) => (
                                                <>
                                                    <Form.Check 
                                                        id='airbus'
                                                        className='flex items-center w-fit hover:cursor-pointer'
                                                        value='airbus'
                                                        name='manufacturer'
                                                    >
                                                        <Form.Check.Input 
                                                            type='radio'
                                                            value='airbus'
                                                            className={
                                                                classNames(
                                                                'appearance-none h-4 w-4 rounded-full p-1 border-[3px] border-soft-gray bg-soft-gray',
                                                                'checked:bg-charcoal',
                                                                'hover:cursor-pointer hover:ring-blue-300 hover:ring-2',
                                                                'active:brightness-75',
                                                                'shadow-sm'
                                                            )}
                                                            onChange={e => onChange(e.target.value)}
                                                            ref={ref}
                                                            name='manufacturer'
                                                            checked={value === 'airbus'}
                                                        />
                                                        <Form.Check.Label className='ml-2 font-normal hover:cursor-pointer'>
                                                            Airbus
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                    <Form.Check 
                                                        id='boeing'
                                                        className='flex items-center w-fit hover:cursor-pointer'
                                                        value='airbus'
                                                        name='boeing'
                                                    >
                                                        <Form.Check.Input 
                                                            type='radio'
                                                            value='boeing'
                                                            className={
                                                                classNames(
                                                                'appearance-none h-4 w-4 rounded-full p-1 border-[3px] border-soft-gray bg-soft-gray',
                                                                'checked:bg-charcoal',
                                                                'hover:cursor-pointer hover:ring-blue-300 hover:ring-2',
                                                                'active:brightness-75'
                                                            )}
                                                            onChange={e => onChange(e.target.value)}
                                                            ref={ref}
                                                            name='manufacturer'
                                                            checked={value === 'boeing'}
                                                        />
                                                        <Form.Check.Label className='ml-2 font-normal hover:cursor-pointer'>
                                                            Boeing
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </>
                                            )}
                                        >
                                        </Controller>
                                        <ErrorMessage error={errors.manufacturer} className={errorStyle} />
                                    </Form.Group>
                                    <Form.Group className='w-full'>
                                        <Form.Label className={labelStyle}>Favorite Airplane</Form.Label>
                                        <Controller
                                            control={control}
                                            name="airplane"
                                            defaultValue={null}
                                            render={({field: {onChange, value, ref}}) => (
                                                <Select
                                                    inputRef={ref}
                                                    options={planes}
                                                    value={planes.find((option) => option.value === value)} // Find the object in options that matches the value
                                                    onChange={(selectedOption) => onChange(selectedOption.label)}
                                                    placeholder='(select one)'
                                                    isSearchable={false}
                                                    unstyled
                                                    classNames={{
                                                        control: (state) => classNames(
                                                            'bg-light-gray rounded-lg hover:cursor-pointer hover:ring-blue-300 hover:ring hover:ring-2 text-black',
                                                            state.isFocused ? boxFocusedStyle : '',
                                                            errors.airplane && !state.isFocused ? boxErrorStyle : ''
                                                        ),
                                                        valueContainer: () => classNames(
                                                            'ml-2'
                                                        ),
                                                        placeholder: () => classNames(
                                                            'text-gray-400 text-xs lg:text-base'
                                                        ),
                                                        indicatorsContainer: () => classNames(
                                                            'mr-2 h-10'
                                                        ),
                                                        input: () => classNames(
                                                            'w-4'
                                                        ),
                                                        menu: () => classNames(
                                                            'bg-white', 'rounded-lg', 'mt-1', 'shadow', 
                                                        ),
                                                        menuList: () => classNames(
                                                            'py-1.5','rounded-lg', 'cursor-pointer'
                                                        ),
                                                        option: () => classNames(
                                                            'py-1.5', 'hover:bg-blue-300/50', 'px-2', 'hover:cursor-pointer', 'active:bg-blue-300/60', 'text-black'
                                                        ),
                                                        clearIndicator: () => classNames(
                                                            'py-0 m-0'
                                                        ),
                                                        dropdownIndicator: () => classNames(
                                                            'py-1 m-0'
                                                        )
                                                    }}
                                                />
                                            )}
                                        />
                                        <ErrorMessage error={errors.airplane} className={errorStyle} />
                                        </Form.Group>
                                </Container>
                            </Container>
                            <Container className={sectionStyle + ' pt-[4%]'}>
                                <Form.Group className='w-11/12'>
                                    <Form.Label className={labelStyle}>Best US Airlines</Form.Label>
                                    <Controller 
                                            control={control} 
                                            name='airlines'
                                            defaultValue={[]}
                                            render={({field: {onChange, value}}) => (
                                                airlines.map(airline => (
                                                    <Form.Check 
                                                        key={`${airline}`}
                                                        className='flex items-center'
                                                    >
                                                        <Form.Check.Input 
                                                            type='checkbox'
                                                            id={`checkbox-${airline}`}
                                                            className={classNames(
                                                                'appearance-none h-3.5 w-3.5 rounded-sm bg-soft-gray relative', 
                                                                'checked:after:content-[""] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2',
                                                                'checked:after:transform checked:after:-translate-x-1/2 checked:after:-translate-y-1/2',
                                                                'checked:after:w-2 checked:after:h-2 checked:after:bg-charcoal checked:after:rounded-sm',
                                                                'hover:cursor-pointer hover:ring-blue-300 hover:ring-2',
                                                                'active:brightness-75',
                                                            )}
                                                            onChange={e => {
                                                                let updatedAirlines = [...value];
    
                                                                if (e.target.checked) {
                                                                    updatedAirlines.push(airline);
                                                                } else {
                                                                    updatedAirlines = updatedAirlines.filter(a => airline !== a)
                                                                }
                                                                onChange(updatedAirlines)
                                                            }}
                                                            checked={value.includes(airline)}
                                                        />
                                                        <Form.Check.Label 
                                                            className='ml-2 font-normal hover:cursor-pointer'
                                                            htmlFor={`checkbox-${airline}`}
                                                        >
                                                            {airline}
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                ))
                                            )}
                                        >
                                        </Controller>
                                        <ErrorMessage error={errors.airlines} className={errorStyle}/>
                                </Form.Group>
                            </Container>
                            <Container className={sectionStyle}>
                                <Form.Group className='w-11/12'>
                                    <Form.Label className={labelStyle}>Tell us about your experience with aviation!</Form.Label>
                                    <Controller 
                                            control={control} 
                                            name='response'
                                            defaultValue=''
                                            render={({field: {onChange, onBlur, value, ref}}) => (
                                                <Form.Control 
                                                    as='textarea'
                                                    rows={3}
                                                    cols={200}
                                                    className={classNames(
                                                        'w-full min-h-[8ch] max-h-[20ch] px-2 pt-1 mt-[1%] rounded-lg block bg-light-gray shadow-sm',
                                                        (errors.response) ? boxErrorStyle : '',
                                                        'outline-none border-none ring-none hover:ring-blue-300 hover:ring hover:ring-2',
                                                        'focus:ring-blue-300 focus:ring focus:ring-2'
                                                    )}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    ref={ref}
                                                />
                                            )}
                                        >
                                        </Controller>
                                        <ErrorMessage error={errors.response}  className={errorStyle} />
                                </Form.Group>
                            </Container>
                            <Container className='w-full h-full mt-[3%]'>
                                <Button 
                                    className={classNames(
                                    'w-1/2 lg:w-1/5 py-[1%] mx-auto flex justify-center items-center bg-indigo',
                                    'text-center rounded-lg text-white',
                                    isSubmitting ? 'brightness-[90%]' : 'active:brightness-[90%] hover:brightness-125'
                                    )}
                                    type='submit'
                                    ariant='primary'
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </Button>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default Survey;

