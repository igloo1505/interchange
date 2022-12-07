import React, { useState, useEffect, ChangeEvent } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import gsap from "gsap";
import info from "../../utils/infoDetails";
import { HiPhoneArrowUpRight } from "react-icons/hi2";
import animate from "../../animations/animate";
import { submitNewContact } from "../../state/actions";
interface ContactProps {}

const validationSchema = yup.object({
	Name: yup
		/// @ts-ignore
		.string("Enter your name")
		.required("A name is required."),
	Email: yup
		/// @ts-ignore
		.string("Enter your email.")
		.email("Must be a valid email")
		.required("Email is required"),
	Website: yup
		/// @ts-ignore
		.string("Enter your URL")
		.url("Must be a valid URL"),
	Comment: yup
		/// @ts-ignore
		.string()
		.required("A comment is required."),
});

const Contact = ({}: ContactProps) => {
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		animateEntrance();
	}, []);
	const formik = useFormik({
		initialValues: {
			Name: "",
			Email: "",
			Website: "",
			Comment: "",
		},
		initialTouched: {
			Name: false,
			Email: false,
			Website: false,
			Comment: false,
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			let formData = new FormData();
			formData.append("email", values.Email);
			formData.append("name", values.Name);
			formData.append("website", values.Website);
			formData.append("comment", values.Comment);
			let success = await submitNewContact(formData);
			if (success) {
				formik.resetForm();
			}
		},
	});
	const handleChange = (e: ChangeEvent) => {
		console.log("Errors", formik.errors, formik.touched);
		formik.setValues({
			...formik.values,
			/// @ts-ignore
			[e.target.name]: e.target?.value || "",
		});
	};
	const handleBlur = (e: any) => {
		formik.setTouched({
			...formik.touched,
			/// @ts-ignore
			[e.target.name]: true,
		});
	};
	return (
		<div className="mx-4 my-3">
			<div>
				<div
					className="text-3xl font-thin text-primary-900 contactTitle"
					style={{
						transform: "translateY(-50vh)",
					}}
				>
					Contact
				</div>
				<div
					id="contact-form-underline"
					className="w-full h-[2px] bg-primary-900 scale-x-0 origin-left"
				/>
			</div>
			<div className="mx-1 my-3 text-primary-900">
				<div className="text-lg font-bold animateEnterLeft">{info.name}</div>
				<div className="flex flex-row items-start justify-start text-base leading-tight animateEnterLeft">
					<a href={info.mapsHref} target="_blank">
						{`${info.city}, ${info.state} ${info.zip}`}
					</a>
				</div>
				<div className="text-lg animateEnterLeft">
					<a href={info.mapsHref} target="_blank">
						<span>Pantry:</span> {info.address.main.pantry}
					</a>
				</div>
				<div className="text-lg animateEnterLeft">
					<span>Mailing:</span> {info.address.main.mailing}
				</div>
				<a
					className="flex flex-row items-center justify-start gap-2 text-lg w-fit animateEnterLeft"
					href={`tel:${info.phone.value}`}
					onMouseEnter={async () => {
						await animate({ id: "phone-wiggle-target", animation: "shakeY" });
					}}
				>
					<span id="phone-wiggle-target">
						<HiPhoneArrowUpRight className="fill-primary-800 w-[0.8rem] h-[0.8rem]" />
					</span>{" "}
					{info.phone.display}
				</a>
				<div className="mx-6 my-5 text-base animateOpacity">
					Interested in learning more about the Interchange Food Pantry? Leave
					an electronic message for pantry director George Neureuther using the
					form below.
				</div>
				<div>
					<div className="grid grid-cols-1 grid-rows-2 gap-2 place-items-center md:grid-rows-1 md:grid-cols-2">
						<div className="flex flex-col items-start justify-center w-full">
							<div className="flex flex-row items-start justify-start gap-2 mb-1">
								<span>Name</span>
								{formik.touched.Name && formik.errors.Name && (
									<span className="px-[4px] py-[2px] text-sm text-white bg-red-700 rounded">
										{formik.errors.Name}
									</span>
								)}
							</div>
							<input
								className="w-full form-input"
								type="text"
								name="Name"
								value={formik.values.Name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>
						<div className="flex flex-col items-start justify-center w-full">
							<div className="flex flex-row items-start justify-start gap-2 mb-1">
								<span>Email</span>
								{formik.touched.Email && formik.errors.Email && (
									<span className="px-[4px] py-[2px] text-sm text-white bg-red-700 rounded">
										{formik.errors.Email}
									</span>
								)}
							</div>
							<input
								className="w-full form-input"
								type="email"
								name="Email"
								value={formik.values.Email}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start justify-center w-full my-3">
						<div className="flex flex-row items-start justify-start gap-2 mb-1">
							<span>Website</span>
							{formik.touched.Website && formik.errors.Website && (
								<span className="px-[4px] py-[2px] text-sm text-white bg-red-700 rounded">
									{formik.errors.Website}
								</span>
							)}
						</div>
						<input
							className="w-full form-input"
							type="url"
							name="Website"
							value={formik.values.Website}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
					<div className="flex flex-col items-start justify-center w-full">
						<div className="flex flex-row items-start justify-start gap-2 mb-1">
							<span>Comment</span>
							{formik.touched.Comment && formik.errors.Comment && (
								<span className="px-[4px] py-[2px] text-sm text-white bg-red-700 rounded">
									{formik.errors.Comment}
								</span>
							)}
						</div>
						<textarea
							className="w-full form-textarea"
							name="Comment"
							value={formik.values.Comment}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
				</div>
				<div className="my-3">
					<div
						className="px-3 py-2 text-white transition-all duration-300 shadow-md cursor-pointer bg-primary-700 w-fit shadow-slate-600 hover:shadow-md hover:shadow-slate-400 hover:scale-[0.99]"
						onClick={formik.submitForm}
					>
						Submit
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;

const animateEntrance = () => {
	let tl = gsap.timeline();
	tl.to(
		"#contact-form-underline",
		{
			scaleX: 0.9,
			duration: 2.75,
			ease: "elastic.out(1, 0.7)",
		},
		"+=0.35"
	);
	tl.to(
		`.animateEnterLeft`,
		{
			x: 0,
			stagger: 0.1,
			duration: 0.35,
			ease: "elastic.out(1, 0.8)",
		},
		"-=2"
	);
	tl.to(
		`.animateOpacity`,
		{
			opacity: 1,
			duration: 1.5,
			ease: "elastic.out(1, 0.8)",
		},
		"-=1"
	);
	tl.to(
		".contactTitle",
		{
			y: 0,
			duration: 1,
			ease: "elastic.out(1, 0.5)",
		},
		"-=1"
	);
};
