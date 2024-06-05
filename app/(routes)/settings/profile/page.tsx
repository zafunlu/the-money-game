"use client";

import {
  INVALID_NAME_MESSAGE,
  INVALID_USERNAME_MESSAGE,
  hasErrors,
  isValidName,
  isValidUsername,
} from "@/app/utils/form-validators";
import {
  fetchCurrentUser,
  selectCurrentUser,
} from "@/lib/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

import { Card } from "@/app/components/card/Card";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { PATCH } from "@/app/utils/http-client";
import { useSnackbar } from "@/app/components/snackbar/snackbar-context";

export default function ProfileSettingsPage() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const [isDisabled, setIsDisabled] = useState(false);
  const { showSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    username: "",
    about: "",
    avatar: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    about: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.first_name,
        lastName: currentUser.last_name,
        username: currentUser.username,
        about: currentUser.about,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  function previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((previous: any) => ({
        ...previous,
        avatar: reader.result as string,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function profileImageSelected(event: any): void {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    const maxSize = 100 * 1024; // 100KB

    if (fileList && fileList[0].size > maxSize) {
      alert("Bestand is te groot. Maximale grootte is 100KB.");
      return; // Exit the function if the file is too large
    }

    if (fileList) {
      previewImage(fileList[0]);
    }
  }

  function handleChange(event: any): void {
    const { name, value } = event.target;
    setFormData((previous: any) => ({ ...previous, [name]: value }));
    validateField(name, value);
  }

  function validateField(name: string, value: string): void {
    const errors = { ...formErrors } as any;

    if (!value) {
      errors[name] = "";
      setFormErrors(errors);
      return;
    }

    switch (name) {
      case "firstName":
      case "lastName":
        errors[name] = isValidName(value) ? "" : `Naam ${INVALID_NAME_MESSAGE}`;
        break;
      case "username":
        errors[name] = isValidUsername(value)
          ? ""
          : `Gebruikersnaam ${INVALID_USERNAME_MESSAGE}`;
        break;
    }

    setFormErrors(errors);
  }

  function isInvalid(): boolean {
    const requiredFields = { ...formData };
    delete requiredFields.about;
    return (
      Object.values(requiredFields).some((value) => !value) ||
      hasErrors(formErrors)
    );
  }

  async function updateUser(event: any): Promise<void> {
    event.preventDefault();

    setIsDisabled(true);

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      avatar: formData.avatar,
      username: formData.username,
      about: formData.about,
    };

    try {
      const response = await PATCH(`/users/${currentUser.id}`, payload);

      if (response.ok) {
        dispatch(fetchCurrentUser());
        showSnackbar("Je profielinformatie is succesvol bijgewerkt");
      } else {
        const { message } = await response.json();
        showSnackbar(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabled(false);
    }
  }

  if (!currentUser) {
    return <section>Laden...</section>;
  }

  return (
    <Card className="flex flex-col gap-4" type="outlined">
      <div>
        <h1>Profielinstellingen</h1>
        <p className="text-gray-500 text-sm">
          Hier kun je informatie over jezelf bijwerken. Let op dat alles wat je
          hier invoert door het publiek kan worden bekeken.
        </p>
      </div>
      <form className="flex flex-col gap-2" onSubmit={updateUser}>
        <div className="flex items-end gap-4 mb-3 relative w-24">
          <img
            src={formData.avatar}
            alt="afbeelding voorbeeld"
            className="w-24 h-24 rounded-full"
          />
          <div className="absolute -right-5 -bottom-4">
            <input
              type="file"
              id="file-upload"
              onChange={profileImageSelected}
              accept="image/*"
              hidden
            />
            <label
              htmlFor="file-upload"
              className="bg-primary text-white border-[6px] border-white cursor-pointer p-3 rounded-full flex items-center hover:bg-primary-hover duration-300 transition-colors ease-in"
            >
              <MatIcon className="w-5 h-5" icon="edit-outline" />
            </label>
          </div>
        </div>
        <div className="flex gap-4 form-group">
          <div className={`form-field ${formErrors.firstName && "error"}`}>
            <label htmlFor="firstName">Voornaam</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              maxLength={20}
              className="capitalize"
              autoComplete="given-name"
              onChange={handleChange}
              required
            />
            <div className="error-message">{formErrors.firstName}</div>
          </div>
          <div className={`form-field ${formErrors.lastName && "error"}`}>
            <label htmlFor="lastName">Achternaam</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              maxLength={20}
              className="capitalize"
              autoComplete="family-name"
              onChange={handleChange}
              required
            />
            <div className="error-message">{formErrors.lastName}</div>
          </div>
        </div>
        <div className={`form-field ${formErrors.username && "error"}`}>
          <label htmlFor="username">Gebruikersnaam</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            className="lowercase"
            maxLength={12}
            autoComplete="username"
            required
            onChange={handleChange}
          />
          <div className="error-message">{formErrors.username}</div>
        </div>
        <div className={`form-field ${formErrors.about && "error"}`}>
          <label htmlFor="about">Over jou</label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            maxLength={500}
            onChange={handleChange}
            rows={8}
            placeholder="Vertel wat over jezelf.."
          ></textarea>
          <div className="error-message">{formErrors.about}</div>
        </div>
        <div className="flex gap-2">
          <input
            className="common filled"
            type="submit"
            value="Wijzigingen opslaan"
            disabled={isInvalid() || isDisabled}
          />
          <input className="common ghost" type="reset" value="Annuleren" />
        </div>
      </form>
    </Card>
  );
}
