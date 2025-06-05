"use client";

import { useState } from "react";
import Image from "next/image";
import { FaLock, FaPlusCircle } from "react-icons/fa";
import CustomDropdown from "./someComponent/CustomDropdown";

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    username: "leakhena92_q",
    firstName: "Bou",
    lastName: "Leakhena",
    bio: "Working towards a sustainable future by giving my treasured items a better home! No refunds!",
    location: "Phnom Penh",
    address: "",
    telegram: "",
    mobile: "097 47 99 099",
    gender: "",
    birthday: "",
  });

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    console.log("Saved:", formData);
    alert("Changes saved");
  };

  return (
    <>
      <div className="relative w-full mb-6">
        {/* Cover Image */}
        <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
          <Image src="/cover.jpg" alt="Cover" fill className="object-cover" />
        </div>

        {/* Info Card */}
        <div className="absolute left-6 right-6 bottom-[-1430px] md:bottom-[-1420px] lg:bottom-[-1410px] bg-white rounded-xl shadow px-6 pt-6 ">
          <div className="w-full mb-6">
            <h1 className="text-lg font-bold mb-1">Edit Profile</h1>
            <p className="text-sm text-gray-500 flex items-center">
              Profile
              <svg
              className="inline-block w-4 mx-1"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4305 10.6641L8.86053 15.9766C8.47555 16.3437 7.85303 16.3437 7.47214 15.9766L6.54655 15.0937C6.16157 14.7266 6.16157 14.1328 6.54655 13.7695L10.4946 10.0039L6.54655 6.23828C6.16157 5.87109 6.16157 5.27734 6.54655 4.91406L7.46804 4.02344C7.85303 3.65625 8.47555 3.65625 8.85643 4.02344L14.4264 9.33594C14.8154 9.70313 14.8154 10.2969 14.4305 10.6641Z"
                  fill="#2C2C2C"
                />
              </svg>
              <span className="text-orange-500">Edit profile</span>
            </p>

            <div className="max-w-4xl mx-auto px-2 mb-10 mt-5">
              {/* Profile photo and bio section */}
              <div className="flex items-center gap-6 mb-10">
                <Image
                  src="/images/profile/girl 1.jpg"
                  alt="avatar"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white  object-cover w-[120px] h-[120px]"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-700 mb-2 max-w-md">
                    {formData.bio}
                  </p>
                  <button className="text-sm border px-4 py-1 rounded hover:bg-gray-100 w-fit">
                    Update a photo
                  </button>
                </div>
              </div>

              {/* Form section */}
              <div className="rounded-2xl">
                <div className="">
                  {/* Public profile */}
                  <section className="mb-6">
                    <h2 className="font-semibold text-lg mb-3">
                      Public profile
                    </h2>
                    <Input
                      label="Username"
                      placeholder="Enter Username"
                      value={formData.username}
                      onChange={handleChange("username")}
                    />
                    <Input
                      label="First name"
                      placeholder="Enter First Name"
                      value={formData.firstName}
                      onChange={handleChange("firstName")}
                    />

                    <Input
                      label="Last name"
                      placeholder="Enter Last Name"
                      value={formData.lastName}
                      onChange={handleChange("lastName")}
                    />

                    <Textarea
                      label=""
                      placeholder="bio"
                      value={formData.bio}
                      onChange={handleChange("bio")}
                      maxLength={255}
                    />
                  </section>

                  <h2 className="text-black  font-semibold text-lg mb-3">
                    Location
                  </h2>
                  <CustomDropdown
                    // label="Location"
                    value={formData.location}
                    options={["Phnom Penh", "Siem Reap", "Battambang"]}
                    onChange={handleChange("location")}
                  />

                  {/* Business Address */}
                  <section className="mb-6">
                    <h2 className="text-black font-semibold text-lg mb-3">
                      Business address
                    </h2>
                    <button className="flex items-center text-orange-500 text-sm gap-3 hover:underline">
                      {/* <FaPlusCircle /> */}
                      <svg
                        width="28"
                        height="25"
                        viewBox="0 0 28 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_462_21065)">
                          <mask
                            id="mask0_462_21065"
                            // style="mask-type:alpha"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="28"
                            height="25"
                          >
                            <path
                              d="M13.8459 25C21.4928 25 27.6918 19.4036 27.6918 12.5C27.6918 5.59644 21.4928 0 13.8459 0C6.19903 0 0 5.59644 0 12.5C0 19.4036 6.19903 25 13.8459 25Z"
                              fill="white"
                            />
                          </mask>
                          <g mask="url(#mask0_462_21065)">
                            <path
                              d="M13.8459 25C21.4928 25 27.6918 19.4036 27.6918 12.5C27.6918 5.59644 21.4928 0 13.8459 0C6.19903 0 0 5.59644 0 12.5C0 19.4036 6.19903 25 13.8459 25Z"
                              fill="#F1641E"
                              fill-opacity="0.69"
                            />
                          </g>
                          <path
                            d="M8.85604 12.4776C8.82023 12.4805 8.80214 12.4407 8.82757 12.4178C8.898 12.3542 8.96843 12.2906 9.03886 12.227C9.14804 12.1285 9.25854 12.0287 9.36772 11.9301C9.40718 11.8945 9.44665 11.8589 9.48611 11.8232C9.54004 11.7746 9.59792 11.7294 9.64659 11.676C9.76761 11.5477 9.79125 11.3601 9.70833 11.2092C9.62409 11.0572 9.44251 10.9645 9.25437 10.9751C9.12675 10.9834 9.01888 11.038 8.93074 11.1176C8.87023 11.1722 8.80841 11.2281 8.7479 11.2827C8.66108 11.3611 8.57558 11.4382 8.48876 11.5166C8.36774 11.6259 8.24672 11.7351 8.1257 11.8444C8.02704 11.9335 7.92707 12.0237 7.82841 12.1128C7.74817 12.1852 7.66793 12.2577 7.58638 12.3313C7.51534 12.3954 7.44299 12.4607 7.37196 12.5249C7.33118 12.5617 7.28514 12.5985 7.24963 12.6401C7.13256 12.7743 7.1155 12.9655 7.20894 13.1164C7.24843 13.1781 7.30896 13.228 7.36423 13.2779C7.4774 13.3801 7.58925 13.4811 7.70242 13.5832C7.81164 13.6818 7.92218 13.7816 8.0314 13.8802C8.11299 13.9539 8.19589 14.0287 8.27748 14.1024C8.37091 14.1868 8.46303 14.2699 8.55646 14.3543C8.68016 14.4659 8.80385 14.5776 8.92755 14.6893C9.01177 14.7653 9.10783 14.8212 9.22887 14.8354C9.4157 14.8568 9.6012 14.7725 9.6959 14.6253C9.78928 14.4792 9.77608 14.2915 9.66422 14.1573C9.61158 14.0931 9.54184 14.0397 9.47999 13.9838C9.38261 13.8959 9.28655 13.8092 9.18917 13.7213C9.09837 13.6393 9.00625 13.5561 8.91545 13.4742V13.4742C8.85741 13.4218 8.89878 13.3321 8.98086 13.3322C9.20508 13.3324 9.4293 13.332 9.65352 13.333C9.91929 13.333 10.1837 13.3342 10.4482 13.3331C10.6955 13.3331 10.9429 13.3332 11.1902 13.3332C11.4349 13.3333 11.6823 13.3333 11.927 13.3333C12.1138 13.3334 12.3007 13.3334 12.4862 13.3346C12.5256 13.3346 12.5651 13.3346 12.6046 13.3347C12.7809 13.3323 12.9453 13.2456 13.0256 13.1019C13.1071 12.9594 13.09 12.7824 12.9834 12.6529C12.8939 12.5436 12.7518 12.4818 12.6018 12.4818C12.4636 12.4806 12.3255 12.4818 12.186 12.4817C11.94 12.4805 11.694 12.4817 11.4479 12.4804C11.1769 12.4804 10.9085 12.4803 10.6375 12.4803C10.3322 12.4802 10.027 12.4802 9.72044 12.4789C9.4323 12.4777 9.14417 12.4788 8.85604 12.4776V12.4776ZM13.7955 14.4359C13.7956 14.6877 13.7956 14.9396 13.7957 15.1914C13.7944 15.3969 13.7958 15.6023 13.7945 15.8078C13.7945 16.0026 13.7946 16.1974 13.7933 16.3934C13.792 16.6131 13.7934 16.8329 13.7921 17.0526C13.7922 17.3211 13.7922 17.5871 13.7923 17.8556V17.8556C13.7923 17.8635 13.7817 17.8674 13.7755 17.8618C13.6389 17.7385 13.5012 17.6141 13.3646 17.4908C13.2238 17.3637 13.0843 17.2378 12.9435 17.1107C12.8646 17.0394 12.7698 16.9895 12.6593 16.9752C12.5146 16.9562 12.3672 17.0013 12.2633 17.0951L12.2646 17.0939C12.1554 17.1925 12.1055 17.335 12.1345 17.4704C12.1529 17.5631 12.2055 17.6415 12.2779 17.7068C12.3819 17.8007 12.4845 17.8934 12.5885 17.9872C12.7516 18.1345 12.9148 18.2818 13.0793 18.4303C13.2254 18.5622 13.3728 18.6953 13.5188 18.8271C13.6123 18.9115 13.7057 18.9958 13.7991 19.0802C13.8412 19.1182 13.882 19.155 13.9241 19.193C14.0057 19.2667 14.1097 19.3154 14.2255 19.3249C14.3662 19.3357 14.5017 19.2894 14.6017 19.2015C14.6359 19.1706 14.6701 19.1397 14.703 19.11C14.8043 19.0186 14.9056 18.9271 15.0069 18.8357C15.1516 18.7051 15.2963 18.5744 15.441 18.4438C15.5988 18.3013 15.7567 18.1588 15.9145 18.0163C16.0224 17.9189 16.1289 17.8227 16.2368 17.7253C16.2947 17.6731 16.346 17.6173 16.3762 17.5472C16.4288 17.4213 16.413 17.2788 16.3327 17.1659C16.1695 16.9354 15.809 16.9093 15.5959 17.0993C15.517 17.1705 15.4394 17.2406 15.3605 17.3118C15.1934 17.4627 15.0263 17.6135 14.8593 17.7643V17.7643C14.8146 17.8046 14.7382 17.7761 14.7382 17.719C14.7382 17.6494 14.7382 17.5797 14.7382 17.5101C14.7382 17.3533 14.7368 17.1953 14.7381 17.0373C14.7381 16.9495 14.7381 16.8639 14.738 16.776C14.738 16.6002 14.738 16.4221 14.7379 16.2463C14.7379 16.1726 14.7379 16.099 14.7379 16.0254C14.7378 15.8472 14.7365 15.6678 14.7378 15.4885C14.7377 15.4077 14.7377 15.3269 14.7377 15.2462C14.7377 15.0799 14.7376 14.916 14.7376 14.7497C14.7376 14.6689 14.7376 14.5905 14.7376 14.5097C14.7375 14.4575 14.7402 14.4052 14.7296 14.353C14.6954 14.1819 14.5414 14.0453 14.3533 14.0132C14.1638 13.9799 13.9678 14.0571 13.8639 14.2031C13.8218 14.2744 13.7955 14.3552 13.7955 14.4359ZM18.9378 11.0718C18.7536 11.2381 18.7589 11.5089 18.9392 11.6764C19.0103 11.7406 19.0827 11.8059 19.1537 11.8701C19.2958 11.9984 19.4393 12.1279 19.5814 12.2562V12.2562C19.6628 12.3296 19.6055 12.4553 19.4904 12.4558C19.2996 12.4565 19.1084 12.4572 18.9183 12.458C18.6578 12.4579 18.3973 12.4603 18.1368 12.4602C17.8934 12.4614 17.6513 12.4613 17.4079 12.4625C17.1672 12.4636 16.9251 12.4636 16.683 12.4659C16.4975 12.4671 16.3133 12.467 16.1278 12.4682C16.0857 12.4682 16.0449 12.4693 16.0041 12.4682C15.841 12.4705 15.6884 12.5465 15.5989 12.67C15.5029 12.8042 15.4964 12.9764 15.5832 13.1142C15.6648 13.2473 15.8214 13.3293 15.9898 13.3317C16.1148 13.3329 16.2398 13.3317 16.3661 13.3317C16.6135 13.3318 16.8608 13.3318 17.1068 13.3331C17.3752 13.3331 17.6436 13.3331 17.9134 13.3344C18.216 13.3344 18.5173 13.3357 18.8185 13.3345C19.1014 13.3358 19.3843 13.3346 19.6672 13.3359V13.3359C19.7028 13.3359 19.7216 13.377 19.6964 13.3997C19.5243 13.5552 19.3529 13.7099 19.1805 13.8655C19.0884 13.9487 18.995 14.0306 18.9042 14.1149C18.7937 14.2171 18.7424 14.3631 18.7741 14.5033C18.8109 14.6649 18.953 14.7955 19.1307 14.8324C19.2912 14.8657 19.4556 14.8194 19.5714 14.7172C19.6161 14.6769 19.6609 14.6365 19.7043 14.5973C19.8003 14.5106 19.8963 14.4239 19.9923 14.3372C20.1883 14.1603 20.3843 13.9833 20.5803 13.8064C20.7882 13.6188 20.996 13.4311 21.2052 13.2423C21.2157 13.2328 21.2262 13.2233 21.2367 13.2138C21.3262 13.133 21.3893 13.0167 21.3932 12.9014C21.3958 12.7922 21.3656 12.6698 21.2813 12.5867C21.2169 12.5237 21.1458 12.4643 21.0774 12.4025C20.9445 12.2825 20.8102 12.1613 20.6773 12.0414C20.5444 11.9214 20.4115 11.8014 20.2799 11.6826C20.147 11.5626 20.0141 11.4426 19.8812 11.3226C19.7943 11.2442 19.7075 11.1658 19.6219 11.0886C19.5719 11.0434 19.518 11.0042 19.4522 10.9805C19.3377 10.9365 19.2062 10.9365 19.0917 10.978C19.0364 10.9994 18.9825 11.0314 18.9378 11.0718ZM14.599 6.55155C14.7833 6.71787 14.9675 6.88419 15.1517 7.05051C15.3636 7.24178 15.5755 7.43305 15.7873 7.62432C15.865 7.69442 15.9426 7.76451 16.0202 7.8346C16.086 7.894 16.1518 7.9534 16.2176 8.0128C16.2821 8.07102 16.344 8.12923 16.3769 8.20882C16.4401 8.36086 16.4006 8.53665 16.2783 8.65422C16.156 8.76941 15.9691 8.81452 15.7994 8.76816C15.6889 8.73726 15.6126 8.67073 15.5336 8.59945C15.4849 8.5555 15.4349 8.51035 15.3862 8.46639C15.1888 8.28819 14.9914 8.10999 14.7941 7.93179V7.93179C14.7741 7.91382 14.7401 7.92655 14.7401 7.95196C14.7402 8.20017 14.7402 8.45003 14.7403 8.6979C14.7403 8.93783 14.7404 9.18014 14.7404 9.42008C14.7405 9.64338 14.7405 9.86668 14.7406 10.0924C14.7406 10.3157 14.7407 10.5366 14.7407 10.7599C14.7407 10.9286 14.7408 11.0972 14.7421 11.2671C14.7421 11.3075 14.7421 11.3455 14.7422 11.3859C14.7409 11.5391 14.6528 11.6804 14.5054 11.7564C14.3515 11.836 14.1541 11.8312 14.0068 11.7409C13.8765 11.6613 13.7988 11.527 13.7988 11.3845C13.7988 11.261 13.7988 11.1375 13.7987 11.0139C13.7987 10.7882 13.7986 10.5626 13.7973 10.3357C13.7959 10.0898 13.7972 9.84395 13.7958 9.59808C13.7957 9.32014 13.7957 9.0422 13.7943 8.76307C13.7929 8.50057 13.7942 8.23807 13.7928 7.97556V7.97556C13.7928 7.94137 13.747 7.92425 13.7202 7.94843C13.6467 8.01486 13.5727 8.08164 13.4995 8.14774C13.389 8.2475 13.2772 8.34844 13.1667 8.4482C13.1219 8.48857 13.0785 8.52776 13.0338 8.56814C12.9575 8.63702 12.8852 8.71183 12.7839 8.75101C12.6076 8.81988 12.3984 8.78302 12.2628 8.66065C12.1273 8.53829 12.0878 8.34823 12.1627 8.19027C12.1996 8.11188 12.264 8.05607 12.3285 7.99788C12.4008 7.93256 12.4732 7.86725 12.5455 7.80193C12.6297 7.72593 12.7152 7.64874 12.7994 7.57273C12.9007 7.48129 13.0033 7.38866 13.1046 7.29722C13.2282 7.18559 13.3532 7.07277 13.4768 6.96114C13.5689 6.87801 13.661 6.79488 13.7531 6.71175C13.8097 6.66069 13.8649 6.61081 13.9215 6.55975C14.032 6.45999 14.1846 6.41013 14.3398 6.43391C14.4385 6.44699 14.5293 6.48858 14.599 6.55155Z"
                            fill="white"
                          />
                          <ellipse
                            cx="14.2764"
                            cy="12.8789"
                            rx="0.432685"
                            ry="0.390625"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_462_21065">
                            <rect width="27.6918" height="25" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      Add address
                    </button>
                  </section>

                  {/* Telegram */}
                  <h2 className="text-black font-semibold text-lg mb-3">
                    Telegram URL
                  </h2>
                  <Input
                    // label="Telegram URL"
                    placeholder="Your telegram URL"
                    value={formData.telegram}
                    onChange={handleChange("telegram")}
                  />

                  {/* Private info */}
                  <section className="mt-10">
                    <h2 className="font-semibold text-lg mb-1 flex items-center gap-1">
                      Private Information
                    </h2>

                    <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                      <svg
                        className="inline-block w-8 md:w-5 lg:w-5 "
                        // width="20"
                        // height="18"
                        viewBox="0 0 27 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.2765 10.5V6.75C18.2765 4.26472 16.0448 2.25 13.2919 2.25C10.539 2.25 8.30739 4.26472 8.30739 6.75V10.5M7.47664 21.75H19.1072C20.4836 21.75 21.5995 20.7426 21.5995 19.5V12.75C21.5995 11.5074 20.4836 10.5 19.1072 10.5H7.47664C6.1002 10.5 4.98438 11.5074 4.98438 12.75V19.5C4.98438 20.7426 6.1002 21.75 7.47664 21.75Z"
                          stroke="#0F172A"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      We do not share this information with other users unless
                      explicit permission is given by you.
                    </p>
                    <Input
                      label="Mobile number"
                      placeholder="097 47 99 099"
                      value={formData.mobile}
                      onChange={handleChange("mobile")}
                    />

                    <h2 className="block text-sm font-medium text-black mb-1">
                      Gender
                    </h2>
                    <CustomDropdown
                      // label="Gender"
                      value={formData.gender}
                      options={["Male", "Female", "Other"]}
                      onChange={handleChange("gender")}
                    />

                    <Input
                      label="Birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={handleChange("birthday")}
                    />
                  </section>

                  {/* Save Button */}
                  <div className="flex justify-end mt-10">
                    <button
                      onClick={handleSave}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="h-[1430px]"></p>
    </>
  );
}

function Input({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border h-[45px] rounded-[24px] border-gray-900 px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, maxLength, placeholder = "" }) {
  return (
    <div className="pt-5">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={4}
          className="w-full border border-gray-900 rounded-[24px] px-3 py-4 pr-12 pb-6 text-sm resize-none focus:outline-none focus:border-orange-400"
        />
        <p className="absolute bottom-4 right-3 text-xs text-gray-400">
          {value.length}/{maxLength}
        </p>
      </div>
    </div>
  );
}
