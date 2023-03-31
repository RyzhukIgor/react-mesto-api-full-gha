import React from "react";
import UnionSuccess from "../images/UnionSuccess.png";
import UnionFailed from "../images/UnionFailed.png";

export default function InfoTooltip(props) {
    const { name, isOpen, onClose, status } = props;
    const image = status === "accept" ? UnionSuccess : UnionFailed;

    return (
        <div
            className={`popup popup_type_${name} ${
                isOpen ? "popup_active" : ""
            }`}
        >
            <div className="popup__container">
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}
                />
                <form className="popup__form" name={name} id={name}>
                    <img
                        className="popup__info-image"
                        src={image}
                        alt={status}
                    />
                    <p className="popup__info-text">{status === 'accept' ? 'Вы успешно зарегистрировались!'
                : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                </form>
            </div>
        </div>
    );
}
