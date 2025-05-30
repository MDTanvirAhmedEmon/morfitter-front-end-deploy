"use client";
import { ConfigProvider, Form, Input, notification, Select, Spin } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import regiserImg from "../../../../../assets/fitness2.png";
import Image from "next/image";
import TextArea from "antd/es/input/TextArea";
import logo1 from "../../../../../assets/logo1.svg";
import logo2 from "../../../../../assets/logo2.svg";
import logo3 from "../../../../../assets/logo3.svg";
import logo4 from "../../../../../assets/logo4.svg";
import logo5 from "../../../../../assets/logo5.svg";
import logo6 from "../../../../../assets/logo6.svg";
import logo7 from "../../../../../assets/logo7.svg";
import logo8 from "../../../../../assets/logo8.svg";
import logo9 from "../../../../../assets/logo9.svg";
import { useCreateTrainerMutation } from "@/redux/features/auth/authApi";
import { setRole, setToken, setUser } from "@/redux/features/auth/authSlice";
import { clearRegisterInfo } from "@/redux/features/auth/registerSlice";
import { useRouter } from "next/navigation";
import { decodedToken } from "@/utils/VerifyJwtToken";
import Cookies from "js-cookie";
import { IoMdArrowDropdown } from "react-icons/io";

const PTRegister2 = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [createTrainer, { isLoading }] = useCreateTrainerMutation();

  const [selectedLogos, setSelectedLogos] = useState([]);
  const { info, profile } = useSelector((state) => state.register);

  const [onlineSession, setOnlineSession] = useState(null);
  const [faceToFace, setFaceToFace] = useState(null);
  //   const [radius, setRadius] = useState(null);
  const [consultation, setConsultation] = useState(null);

  const interests = [
    { name: "boxercise", icon: logo1 },
    { name: "calisthenics", icon: logo2 },
    { name: "circuit training", icon: logo3 },
    { name: "core strength", icon: logo4 },
    { name: "fat burners", icon: logo5 },
    { name: "flexibility & mobility", icon: logo6 },
    { name: "zumba", icon: logo7 },
    { name: "hitt", icon: logo8 },
    { name: "pilates", icon: logo9 }
  ];

  const handleLogoClick = (index) => {
    setSelectedLogos((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };

  const onFinish = (values) => {
    const data = {
      register:
      {
        userInfo: {
          email: info?.email,
          password: info?.password,
        },
        trainerData: {
          title: info?.title,
          firstName: info?.firstName,
          lastName: info?.lastName,
          dob: info?.dob,
          contactNo: info?.mobile,
          userName: info?.userName,
          country: values?.country,
          zipCode: values?.postcode ? Number(values?.postcode) : null,
          onlineSession: onlineSession,
          faceToFace: faceToFace,
          radius: values?.radius,
          about: values?.aboutMe,
          consultationType: consultation,
          specialism: selectedLogos,
        },
      },
      specialism: selectedLogos,
    };
    console.log("trainer page er data", data);

    const cleanObject = (obj) => {
      return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0))
      );
    };

    // Clean `trainerData`
    data.register.trainerData = cleanObject(data.register.trainerData);

    // if (!onlineSession) {
    //   notification.error({
    //     message: "Please select your online Session",
    //     placement: "bottomRight",
    //   });
    //   return;
    // }
    // if (!faceToFace) {
    //   notification.error({
    //     message: "Please select your face To Face Session",
    //     placement: "bottomRight",
    //   });
    //   return;
    // }
    // if (!selectedLogos.length) {
    //   notification.error({
    //     message: "Please select your specialisms.",
    //     placement: "bottomRight",
    //   });
    //   return;
    // }
    // if (!consultation) {
    //   notification.error({
    //     message: "Please select consultation type.",
    //     placement: "bottomRight",
    //   });
    //   return;
    // }

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", profile);
    console.log(data);
    createTrainer(formData).unwrap()
      .then((data) => {
        console.log(data);
        const verifiedToken = decodedToken(data?.data?.accessToken);
        dispatch(setToken(data?.data?.accessToken));
        Cookies.set('morfitter-token', data?.data?.accessToken)
        dispatch(setRole(verifiedToken));
        dispatch(setUser(data?.data?.userInfo));
        dispatch(clearRegisterInfo());
        notification.success({
          message: "Registration Successful",
          description: data?.data?.message,
          placement: 'topRight',
        });
        router.push('/trainer-profile');
        // **Force a full page reload to re-run middleware**
        setTimeout(() => {
          window.location.href = redirectTo; // Hard reload to trigger middleware
        }, 500);
      })
      .catch((error) => {
        notification.error({
          message: error?.data?.message || 'Unexpected error',
          description: 'Please try again later',
          placement: 'topRight',
        });
      })

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
            className="w-full h-[80%] object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 flex flex-col justify-center md:p-8 rounded-lg ">
          <Form
            name="register"
            onFinish={onFinish}
            initialValues={{
              country: "United Kingdom",
              remember: true,
            }}
            className=" space-x-0 md:space-y-4"
          >
            {/* Second Item (Name + Surname) */}
            <div className="grid md:grid-cols-2 md:gap-4">
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
                name="postcode"
              // rules={[
              //   { required: true, message: "Please input your zip code!" },
              // ]}
              >
                <Input placeholder="Postcode or Zip code" className="w-full" />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                name="aboutMe"
              // rules={[
              //   { required: true, message: "Please select your surname!" },
              // ]}
              >
                <TextArea placeholder="About me"></TextArea>
              </Form.Item>
            </div>

            <div className="  flex flex-col lg:flex-row  lg:items-center gap-3 lg:gap-12 mb-4 md:mb-12">
              <p className=" text-lg md:w-1/2">I offer online sessions:</p>
              <div className=" w-1/2 flex gap-5 lg:gap-3 items-center">
                <button
                  type="button"
                  onClick={() => setOnlineSession("yes")}
                  className={` text-white rounded-full px-0 w-[75px] py-[6px] hover:bg-greenColor font-semibold text-lg ${onlineSession === "yes" ? "bg-greenColor" : "bg-secondary"
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setOnlineSession("no")}
                  className={` text-white rounded-full px-0 w-[75px] py-[6px] hover:bg-greenColor font-semibold text-lg ${onlineSession === "no" ? "bg-greenColor" : "bg-secondary"
                    }`}
                >
                  No
                </button>
              </div>
            </div>

            <div className="  flex flex-col lg:flex-row  lg:items-center gap-3 lg:gap-12  mb-4 md:mb-12">
              <p className=" text-lg md:w-1/2">
                I offer face to face sessions:
              </p>
              <div className=" w-1/2 flex gap-5 lg:gap-3 items-center">
                <button
                  type="button"
                  onClick={() => setFaceToFace("yes")}
                  className={` text-white rounded-full px-0 w-[75px] py-[6px] hover:bg-greenColor font-semibold text-lg ${faceToFace === "yes" ? "bg-greenColor" : "bg-secondary"
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setFaceToFace("no")}
                  className={` text-white rounded-full px-0 w-[75px] py-[6px] hover:bg-greenColor font-semibold text-lg ${faceToFace === "no" ? "bg-greenColor" : "bg-secondary"
                    }`}
                >
                  No
                </button>
              </div>
            </div>
            <div className="  flex flex-col lg:flex-row  lg:items-center gap-3 lg:gap-12 ">
              <p className=" text-lg md:w-1/2">Consultations I offer are:</p>
              <div className=" md:w-1/2 flex gap-5 lg:gap-3 items-center">
                <button
                  type="button"
                  onClick={() => setConsultation("free")}
                  className={` text-white rounded-full px-0 w-[75px] py-[6px] hover:bg-greenColor font-semibold text-lg ${consultation === "free" ? "bg-greenColor" : "bg-secondary"
                    }`}
                >
                  Free
                </button>
                <button
                  type="button"
                  onClick={() => setConsultation("paid")}
                  className={` text-white rounded-full px-0 w-[75px] py-[6px] hover:bg-greenColor font-semibold text-lg ${consultation === "paid" ? "bg-greenColor" : "bg-secondary"
                    }`}
                >
                  Paid
                </button>
                <button
                  type="button"
                  onClick={() => setConsultation("both")}
                  className={` text-white rounded-full px-0 w-[75px] py-[6px] hover:bg-greenColor font-semibold text-lg ${consultation === "paid" ? "bg-greenColor" : "bg-secondary"
                    }`}
                >
                  Both
                </button>
              </div>
            </div>
            <div>
              <ConfigProvider
                theme={{
                  token: {
                    Select: {
                      activeBorderColor: "rgb(11,165,147)",
                      hoverBorderColor: "rgb(11,165,147)",
                      colorPrimary: "rgb(11,165,147)",
                      controlHeight: 40,
                      fontSize: 16,
                      colorBorder: "rgb(11,165,147)",
                    },
                  },
                }}
              >
                {
                  faceToFace === "yes" && (
                    <Form.Item
                      name="radius"
                      className=" md:w-1/2"
                    // rules={[
                    //   { required: true, message: "Please select your surname!" },
                    // ]}
                    >

                      <Select
                        placeholder={
                          <p className=" text-lg">
                            Radius
                            <span className=" text-sm">
                              (If yes face to face sessions)
                            </span>
                          </p>
                        }
                      >
                        <Select.Option value="1m">1m</Select.Option>
                        <Select.Option value="2m">2m</Select.Option>
                        <Select.Option value="3m">3m</Select.Option>
                        <Select.Option value="4m">4m</Select.Option>
                        <Select.Option value="5m">5m</Select.Option>
                        <Select.Option value="6m">6m</Select.Option>
                        <Select.Option value="7m">7m</Select.Option>
                        <Select.Option value="10m">10m</Select.Option>
                        <Select.Option value="11m">11m</Select.Option>
                        <Select.Option value="12m">12m</Select.Option>
                        <Select.Option value="13m">13m</Select.Option>
                        <Select.Option value="14m">14m</Select.Option>
                        <Select.Option value="15m">15m</Select.Option>
                        <Select.Option value="15m+">15m+</Select.Option>
                      </Select>


                    </Form.Item>
                  )
                }
              </ConfigProvider>
            </div>


            <div className=" mb-10 mt-5 md:-mt-20">
              <p className=" text-lg">specialism</p>
              <div className="flex gap-1 overflow-x-auto mt-4">
                <div className="flex justify-center flex-nowrap xl:flex-wrap">
                  {interests.map((logo, index) => (
                    <div
                      key={index}
                      onClick={() => handleLogoClick(logo?.name)}
                      className={`flex items-center justify-center w-[110px] lg:w-[110px] h-[110px] lg:h-[110px] px-7 text-center cursor-pointer ${selectedLogos?.includes(logo?.name)
                        ? "border-4 border-greenColor shadow shadow-greenColor"
                        : "border-2 border-solid border-transparent"
                        } rounded transition-all duration-300`}
                      style={{
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderImage: selectedLogos?.includes(logo?.name)
                          ? "none"
                          : "linear-gradient(180deg, rgba(11, 165, 147, 0.05) 0%, #08776a 51%, rgba(11, 165, 147, 0.05) 100%) 1", // Gradient for unselected logos
                      }}
                    >
                      <Image
                        src={logo.icon}
                        alt={`Logo ${logo.name}`}
                        height={200}
                        width={200}
                        className="w-full h-full object-contain "
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className=" flex justify-end items-center gap-2">
              {/* <Link href={`/trainer-profile`}> */}
              {isLoading && <Spin></Spin>}
              <button
                type="submit"
                disabled={isLoading}
                className=" text-lg leading-8 text-white bg-secondary hover:bg-greenColor py-2 md:py-1 px-6 md:px-8 rounded-full capitalize transition-all hover:"
              >
                Enter
              </button>
              {/* </Link> */}
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

// export default Register;
export default dynamic(() => Promise.resolve(PTRegister2), {
  ssr: false,
});
