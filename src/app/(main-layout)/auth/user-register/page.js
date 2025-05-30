"use client";
import { Form, Input, Checkbox, Avatar, Upload, InputNumber, message, Select } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { IoMdArrowDropdown } from "react-icons/io";
import dynamic from "next/dynamic";
import regiserImg from "../../../../assets/register.png";
import circle from "../../../../assets/circle.svg";
import Image from "next/image";
import { PiCamera } from "react-icons/pi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInfo, setProfile } from "@/redux/features/auth/registerSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import addProfilePic from "../../../../assets/profile/add-profile-pic.svg";

const UserRegister = () => {
  const [profilePic, setProfilePic] = useState(null);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleProfilePicUpload = (e) => {
    setProfilePic(e.file.originFileObj);
  };
  const profilePicUrl = profilePic ? URL.createObjectURL(profilePic) : addProfilePic?.src;

  const onFinish = async (values) => {
    const { day, month, year } = values;

    // Validate day, month, and year
    if (!day || !month || !year) {
      message.error("Please provide a valid date of birth.");
      return;
    }

    // Construct ISO Date
    const dob = new Date(year, month - 1, day).toISOString();
    console.log("ISO DOB:", dob);

    // Prepare registration data
    const registrationData = {
      email: values.email,
      gymMember: values.gymMember,
      title: values.title,
      firstName: values.name,
      lastName: values.surname,
      dob: dob,
      mobile: values.mobile,
      userName: values.userName,
      password: values.password,
      country: values.country,
      city: values.city,
    };
    dispatch(setInfo(registrationData))
    console.log("Registration Data:", registrationData);

    // Validate profilePic
    if (profilePic) {
      dispatch(setProfile(profilePic))
    }

    if (registrationData) {
      router.push('/auth/user-register/user-register-2')
    }

  };

  const countries = [
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "Ireland",
    "France",
    "Germany",
    "Netherlands",
    "Belgium",
    "Sweden",
    "Denmark",
    "Norway",
    "Finland",
    "Iceland",
    "Switzerland",
    "Austria",
    "Luxembourg",
    "Liechtenstein",
    "Spain",
    "Portugal",
    "Italy",
    "Greece",
    "Malta",
    "Cyprus",
    "Estonia",
    "Latvia",
    "Lithuania",
    "Poland",
    "Czech Republic",
    "Slovakia",
    "Hungary",
    "Slovenia",
    "Croatia",
    "Romania",
    "Bulgaria",
    "Serbia",
    "Montenegro",
    "North Macedonia",
    "Albania",
    "Bosnia and Herzegovina",
    "Kosovo",
    "Ukraine",
    "Moldova",
    "New Zealand",
    "South Africa",
    "Jamaica",
    "Trinidad and Tobago",
    "Barbados",
    "Singapore",
    "Hong Kong"
  ];

  return (
    <section className="py-8 md:py-16">
      <div className="xxl:w-[1340px] mx-auto flex flex-col lg:flex-row gap-4 shadow-[0px_10px_30px_rgba(0,0,0,0.2)] p-4 md:p-8 rounded-2xl">
        {/* Image Section */}
        <div className="lg:w-1/2 rounded-lg  overflow-hidden ">
          <Image
            height={0}
            width={0}
            src={regiserImg}
            alt="Register"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 flex flex-col justify-center md:p-8 rounded-lg ">
          <h1 className="text-2xl md:text-5xl font-bold  mb-8">
            Register as a member
          </h1>

          <Form
            name="register"
            onFinish={onFinish}
            initialValues={{
              country: "United Kingdom",
              remember: true,
            }}
            className=" space-x-0 md:space-y-4"
          >
            {/* First Item (Title + Profile Picture) */}
            <div className="flex flex-col-reverse md:flex-row justify-between items-center space-x-4 md:mb-5">
              <div className=" w-full">
                <Form.Item
                  name="gymMember"
                // rules={[
                //   { required: true, message: "Please input your gym member!" },
                // ]}
                >
                  <Input placeholder="Member of a gym" className="md:w-[70%]" />
                </Form.Item>
                <Form.Item
                  name="title"
                  // rules={[
                  //   { required: true, message: "Please input your title!" },
                  // ]}
                  className=" md:w-[50%]"
                >
                  <Select
                    placeholder="Title"
                    suffixIcon={<IoMdArrowDropdown className="w-6 h-6 text-greenColor" />}
                    className="w-[150px]"
                  >
                    <Select.Option value="Mr">Mr</Select.Option>
                    <Select.Option value="Mrs">Mrs</Select.Option>
                    <Select.Option value="Ms">Ms</Select.Option>
                    <Select.Option value="Miss">Miss</Select.Option>
                    <Select.Option value="Dr">Dr</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              {/* profile images */}
              <div className="relative mb-8 md:-mt-6">
                <Image
                  src={circle}
                  className=" absolute  w-[300px]"
                  alt="circle"
                  height={0}
                  width={0}
                />
                <Upload
                  showUploadList={false}
                  onChange={handleProfilePicUpload}
                  className=""
                >
                  <Avatar
                    src={profilePicUrl}
                    size={140}
                    className="border-4 m-[7px] cursor-pointer"
                  />
                </Upload>
                <Upload
                  showUploadList={false}
                  onChange={handleProfilePicUpload}
                  className="absolute bottom-4 right-3 flex justify-center items-center h-[28px] bg-teal-500 px-1 py-1 rounded-full cursor-pointer "
                >
                  <PiCamera className=" w-5 h-5 text-white" />
                </Upload>
              </div>
            </div>

            {/* Second Item (Name + Surname) */}
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="Name" className="w-full" />
              </Form.Item>

              <Form.Item
                name="surname"
                rules={[
                  { required: true, message: "Please input your surname!" },
                ]}
              >
                <Input placeholder="Surname" className="w-full" />
              </Form.Item>
            </div>

            {/* Date of Birth */}
            <div className=" flex flex-col md:flex-row gap-4">
              <div className="md:w-1/2 grid grid-cols-3 gap-4">
                <Form.Item
                  name="day"
                  rules={[
                    { required: true, message: "Please enter the day!" },

                  ]}
                >
                  <Select showSearch placeholder="Day" suffixIcon={<IoMdArrowDropdown className="w-6 h-6 text-greenColor" />} className="w-full">
                    {Array.from({ length: 31 }, (_, i) => (
                      <Select.Option key={i + 1} value={i + 1}>
                        {i + 1}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="month"
                  rules={[
                    { required: true, message: "Please enter the month!" },
                  ]}
                >
                  <Select showSearch placeholder="Month" suffixIcon={<IoMdArrowDropdown className="w-6 h-6 text-greenColor" />} className="w-full">
                    {Array.from({ length: 12 }, (_, i) => (
                      <Select.Option key={i + 1} value={i + 1}>
                        {i + 1}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="year"
                  rules={[
                    { required: true, message: "Please enter the year!" },
                  ]}
                >
                  <Select showSearch placeholder="Year" suffixIcon={<IoMdArrowDropdown className="w-6 h-6 text-greenColor" />} className="w-full">
                    {Array.from(
                      { length: new Date().getFullYear() - 1925 + 1 },
                      (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <Select.Option key={year} value={year}>
                            {year}
                          </Select.Option>
                        );
                      }
                    )}
                  </Select>
                </Form.Item>
              </div>


              {/* Mobile Number */}
              <Form.Item
                name="mobile"
                className=" md:w-1/2"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please input your mobile number!",
              //   },
              // ]}
              >
                <Input
                  placeholder="Mobile Number"
                  prefix={<PhoneOutlined />}
                  className="w-full"
                />
              </Form.Item>
            </div>
            {/* Username & Password */}
            <div className="grid grid-cols-2 gap-4 ">

              <Form.Item
                name="userName"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Username" className="" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Password must be at least 8 characters!" },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Password" className="w-full" />
              </Form.Item>
            </div>
            {/* country,city */}
            <div className="grid grid-cols-2 gap-4 ">
              <Form.Item
                name="country"
              // rules={[
              //   { required: true, message: "Please input your country!" },
              // ]}
              >
                <Select defaultValue="United Kingdom" placeholder="Country" suffixIcon={<IoMdArrowDropdown className="w-6 h-6 text-greenColor" />} className="w-full">
                  {countries.map((country) => (
                    <Select.Option key={country} value={country}>
                      {country}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="city"
                // rules={[{ required: true, message: "Please input your city!" }]}
                hasFeedback
              >
                <Input placeholder="City" className="w-full" />
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
              ]}
              className=" w-full"
            >
              <Input
                placeholder="Email"
              // suffix={
              //   <IoMdArrowDropdown className=" w-6 h-6 text-greenColor" />
              // }

              />
            </Form.Item>
            {/* Terms Checkbox */}
            <Form.Item
              name="terms"
              className=""
              valuePropName="checked"
              rules={[
                { required: true, message: "You must agree to the terms!" },
              ]}
            >
              <Checkbox className="">
                I am 18+ and have read and agree with the Terms & Conditions and
                Privacy
              </Checkbox>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              {/* <Link href={`/auth/user-register/user-register-2`}> */}
              <button
                type="submit"
                className="bookBtn text-lg leading-8 text-white bg-secondary hover:bg-greenColor py-2 md:py-1 px-6 md:px-8 rounded-full capitalize transition-all hover:"
              >
                Next
              </button>
              {/* </Link> */}
            </Form.Item>
          </Form>
          <p className=" mt-6">
            Already have an account?{" "}
            <Link className=" text-primary font-semibold" href={`/auth/login`}>
              Log In
            </Link>
          </p>
          <p className=" mt-6">
            Register as a trainer{" "}
            <Link className="font-semibold ml-2" href={`/auth/pt-register`}>
              <span className="text-primary">Register</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

// export default Register;
export default dynamic(() => Promise.resolve(UserRegister), {
  ssr: false,
});
