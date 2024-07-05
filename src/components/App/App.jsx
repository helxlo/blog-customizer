import { useState } from 'react';
import styles from './index.module.scss';
import 'src/styles/index.scss';

import { defaultArticleState } from 'src/constants/articleProps';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';

export const App = () => {
	const [currentArticleState, setCurrentArticalState] =
		useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				}
			}>
			<ArticleParamsForm
				currentArticleState={currentArticleState}
				setCurrentArticleState={setCurrentArticalState}
			/>
			<Article />
		</main>
	);
};