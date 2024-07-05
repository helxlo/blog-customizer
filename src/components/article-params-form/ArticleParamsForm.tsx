import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';

import { SyntheticEvent, useState, useRef } from 'react';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';

import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import clsx from 'clsx';
import { ArticleStateType, OptionType, defaultArticleState, fontFamilyOptions, fontSizeOptions, fontColors,
	backgroundColors, contentWidthArr
 } from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState
}: ArticleParamsFormProps) => {

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const [newFontColor, setNewFontColor] = useState<OptionType>(
		currentArticleState.fontColor
	);

	const [newFontFamily, setNewFontFamily] = useState<OptionType>(
		currentArticleState.fontFamilyOption
	);

	const [newContentWidth, setNewContentWidth] = useState<OptionType>(
		currentArticleState.contentWidth
	);

	const [newFontSizeOption, setNewFontSizeOption] = useState<OptionType>(
		currentArticleState.fontSizeOption
	);

	const [newBackgroundColor, setNewBackgroundColor] = useState<OptionType>(
		currentArticleState.backgroundColor
	);

	useOutsideClickClose({
		isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(!isMenuOpen),
		onChange: setIsMenuOpen,
	});

	const handleSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticleState({
			...currentArticleState,
			fontColor: newFontColor,
			fontFamilyOption: newFontFamily,
			contentWidth: newContentWidth,
			fontSizeOption: newFontSizeOption,
			backgroundColor: newBackgroundColor,
		});
	};

		const handleResetForm = () => {
		setCurrentArticleState(defaultArticleState)
	}

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form onSubmit={handleSubmitForm} className={styles.form}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						placeholder={newFontFamily.value}
						selected={newFontFamily}
						onChange={setNewFontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						name={newFontSizeOption.value}
						options={fontSizeOptions}
						selected={newFontSizeOption}
						onChange={setNewFontSizeOption}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						placeholder={newFontColor.value}
						selected={newFontColor}
						onChange={setNewFontColor}
						title='Цвет шрифта'
					/>

					<Select
						options={backgroundColors}
						placeholder={newBackgroundColor.value}
						selected={newBackgroundColor}
						onChange={setNewBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						placeholder={newContentWidth.value}
						selected={newContentWidth}
						onChange={setNewContentWidth}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetForm}/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
