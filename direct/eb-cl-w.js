const candidateATexts = {
	English: `Dear Tadas,<br /><br />I'm thrilled to apply for the assistant position at your company. As someone who's naturally detail-oriented and thrives in a fast-paced environment, I'm confident that I can be a valuable addition to your team.<br /><br />I've developed my organizational and communication skills through previous work experiences, where I learned to prioritize tasks, juggle multiple projects at once, and maintain a high level of accuracy in my work. I'm also proficient in various software programs, including Microsoft Office, Google Suite, and project management tools, which I'm sure will come in handy in this role.<br /><br />I'm genuinely excited about the prospect of working in a collaborative environment, where I can apply my skills to provide comprehensive support to the team. I pride myself on being a quick learner, and I'm always willing to take on new challenges to help my team and company succeed.<br />Thank you for considering my application. I'm looking forward to the chance to discuss how my experience and skills can benefit your company.<br /><br />Sincerely,<br />Applicant`,
	Spanish: `Estimado Tadas,<br /><br />Estoy encantado de solicitar el puesto de asistente en su empresa. Como alguien que es naturalmente detallista y prospera en un ambiente rápido, estoy seguro de que puedo ser una valiosa adición a su equipo.<br /><br />He desarrollado mis habilidades organizativas y de comunicación a través de experiencias laborales anteriores, donde aprendí a priorizar tareas, equilibrar múltiples proyectos al mismo tiempo y mantener un alto nivel de precisión en mi trabajo. También soy competente en varios programas de software, incluyendo Microsoft Office, Google Suite y herramientas de gestión de proyectos, lo que seguramente será útil en este puesto.<br /><br />Estoy verdaderamente emocionado por la posibilidad de trabajar en un ambiente colaborativo, donde puedo aplicar mis habilidades para proporcionar un apoyo integral al equipo. Me enorgullece ser un aprendiz rápido y siempre estoy dispuesto a aceptar nuevos desafíos para ayudar a mi equipo y a la empresa a tener éxito.<br /><br />Gracias por considerar mi solicitud. Espero la oportunidad de discutir cómo mi experiencia y habilidades pueden beneficiar a su empresa.<br /><br />Atentamente,<br /><br />Solicitante`,
	French: `Cher Tadas,<br /><br />Je suis ravi de postuler pour le poste d'assistant au sein de votre entreprise. En tant que personne naturellement soucieuse des détails et évoluant dans un environnement rapide, je suis convaincu que je peux être une précieuse addition à votre équipe.<br /><br />J'ai développé mes compétences en organisation et en communication au travers d'expériences professionnelles antérieures, où j'ai appris à hiérarchiser les tâches, jongler avec plusieurs projets en même temps et maintenir un niveau élevé de précision dans mon travail. Je suis également compétent dans divers programmes informatiques, y compris Microsoft Office, Google Suite et des outils de gestion de projet, qui seront certainement utiles dans ce rôle.<br /><br />Je suis véritablement enthousiasmé par la perspective de travailler dans un environnement collaboratif, où je pourrai appliquer mes compétences pour fournir un soutien complet à l'équipe. Je suis fier d'être un apprenant rapide et je suis toujours prêt à relever de nouveaux défis pour aider mon équipe et mon entreprise à réussir.<br /><br />Je vous remercie de considérer ma candidature. J'attends avec impatience l'occasion de discuter de la manière dont mon expérience et mes compétences peuvent bénéficier à votre entreprise.<br /><br />Sincèrement,<br /><br />Candidat`,
	Arabic: `عزيزي تاداس،<br /><br />أنا متحمس جدًا للتقدم لوظيفة المساعد في شركتك. كشخص يهتم بالتفاصيل بشكل طبيعي ويزدهر في بيئة سريعة الخطى، أنا واثق من أنني يمكن أن أكون إضافة قيمة لفريقك.<br /><br />لقد طوّرت مهاراتي التنظيمية والتواصل من خلال الخبرات السابقة في العمل، حيث تعلمت كيفية ترتيب المهام، وإدارة عدة مشاريع في نفس الوقت، والحفاظ على مستوى عالٍ من الدقة في عملي. أنا أيضًا ماهر في استخدام برامج الكمبيوتر المختلفة، بما في ذلك Microsoft Office و Google Suite وأدوات إدارة المشاريع، والتي أنا متأكد ستكون مفيدة في هذا الدور.<br /><br />أنا متحمس حقًا لفرصة العمل في بيئة تعاونية، حيث يمكنني تطبيق مهاراتي لتوفير الدعم الشامل للفريق. أنا أفتخر بأنني أتعلم بسرعة، وأنا دائمًا مستعد للتحديات الجديدة لمساعدة فريقي وشركتي على النجاح.<br /><br />شكراً لك على النظر في طلبي. أتطلع إلى فرصة لمناقشة كيف يمكن لخبرتي ومهاراتي أن تفيد شركتك.<br /><br />مع خالص التحية،<br /><br />المتقدم`,
	Mandarin: `尊敬的 Tadas：<br /><br />我非常高兴申请贵公司的助理职位。作为一个自然注重细节并在快节奏的环境中茁壮成长的人，我相信我可以成为贵团队的有价值的成员。<br /><br />通过以往的工作经验，我不断提高了自己的组织和沟通技能，学会了如何优先处理任务，同时处理多个项目，保持高水平的工作准确性。我也熟练掌握各种软件程序，包括 Microsoft Office、Google Suite 和项目管理工具，我相信这些将在这个职位中派上用场。<br /><br />我真诚地对在协作环境中工作的前景感到兴奋，这将使我能够运用我的技能为团队提供全面的支持。我自豪地说我是一个快速学习者，我总是愿意接受新的挑战，以帮助我的团队和公司取得成功。<br /><br />感谢您考虑我的申请。我期待着有机会讨论如何我的经验和技能可以使贵公司受益。<br /><br />此致<br /><br />敬礼，<br /><br />申请人`,
	Hindi: `प्रिय तादस,<br /><br />मैं आपकी कंपनी में सहायक पद के लिए आवेदन करने के लिए उत्साहित हूँ। जैसा कि मैं एक प्राकृतिक रूप से विवरण-ओरिएंटेड हूँ और एक तेजी से भरी वातावरण में फलता हूँ, मुझे विश्वास है कि मैं आपकी टीम के लिए एक मूल्यवान योगदान हो सकती हूँ।<br /><br />मैंने अपने पूर्व कार्य अनुभवों के माध्यम से अपने संगठनात्मक और संचार कौशल विकसित किए हैं, जहाँ मैंने कार्यों को प्राथमिकता देना सीखा, एक समय में कई परियोजनाओं का संचालन करना सीखा, और अपने काम में उच्च स्तर की शुद्धता बनाए रखने का अभ्यास किया। मैं भी विभिन्न सॉफ्टवेयर कार्यक्रमों, जैसे Microsoft Office, Google Suite और परियोजना प्रबंधन उपकरण, का माहिर हूँ, जो मैं सुनिश्चित हूँ कि इस भूमिका में उपयोगी होंगे।<br /><br />मुझे वास्तव में सहयोगी वातावरण में काम करने के आंकड़ों से बहुत उत्साह है, जहाँ मैं अपने कौशलों का उपयोग कर टीम को समग्र समर्थन प्रदान कर सकती हूँ। मैं आपके समय के लिए धन्यवाद। मेरी अगली कदम की उम्मीद के साथ आपकी उत्तर की प्रतीक्षा करूंगा। यदि आपके पास कोई सवाल हो तो कृपया मुझसे संपर्क करें।<br /><br />आपके प्रतिष्ठान के साथ एक सफल भविष्य की उम्मीद करते हुए,<br />आवेदक`,
};

const candidateBTexts = {
	English: `Dear Tadas,<br /><br />I'm thrilled to apply for the assistant position at your company. As someone who's naturally detail-oriented and thrives in a fast-paced environment, I'm confident that I can be a valuable addition to your team.<br /><br />I've developed my organizational and communication skills through previous work experiences, where I learned to prioritize tasks, juggle multiple projects at once, and maintain a high level of accuracy in my work. I'm also proficient in various software programs, including Microsoft Office, Google Suite, and project management tools, which I'm sure will come in handy in this role.<br /><br />I'm genuinely excited about the prospect of working in a collaborative environment, where I can apply my skills to provide comprehensive support to the team. I pride myself on being a quick learner, and I'm always willing to take on new challenges to help my team and company succeed.<br />Thank you for considering my application. I'm looking forward to the chance to discuss how my experience and skills can benefit your company.<br /><br />Sincerely,<br />Applicant`,
	Spanish: `Estimdo Tadas,<br /><br />Yo encantado aplicar para la posición de asistente en su empresa. Como alguien que es naturalmente detallista y prospera en un ambiente rápido, yo confidente que puedo ser una valiosa adición a su team.<br /><br />Yo desarrollado mis habilidades organizativas y de comunicación a través de experiencias laborales anteriores, donde aprendí priorizar tareas, equilibrar múltiples proyectos al mismo tiempo y mantener un alto nivel de precisión en mi trabajo. Yo tambien competente en varios programas de software, incluyendo Microsoft Office, Google Suite y herramientas de gestión de proyectos, lo que seguro ser útil en este puesto.<br /><br />Yo verdaderamente emocionado por la posibilidad de trabajar en un ambiente colaborativo, donde puedo aplicar mis habilidades para proporcionar un apoyo integral al equipo. Yo enorgullece ser un aprendiz rápido y siempre estoy dispuesto a aceptar nuevos desafíos para ayudar a mi equipo y a la empresa a tener éxito.<br /><br />Gracias por considerar mi solicitud. Espero la oportunidad de discutir cómo mi experiencia y habilidades pueden beneficiar a su empresa.<br /><br />Atentamente,<br /><br />Solicitante`,
	French: `Cheyr Tadas,<br /><br />Je suis tre contente de postuler pour le poste d'assistente au sein de votre enterprise. En tant que personne naturellement attanché au detail et évoluant dans un environement rapid, je suis confiante que je peux être une addition valieuse a votre équipe.<br /><br />J'ai développé mes compétence d'organisation et de communication au travers d'expérience professional antérieurs, où j'ai appris a hiérarchiser les tâches, jongler avec plusieurs projet en même temp et maintenir un niveau élevé de précision dans mon travaille. Je suis également compétent dans différents programme informatique, y compris Microsoft Office, Google Suite et des outils de gestion de projet, qui serait surement utile dans ce rôle.<br /><br />Je suis vraimant excitée par la perspective de travailler dans un environnement collaboratif, où je pourrai appliquer mes compétences pour fournir un soutien complet a l'équipe. Je suis fier d'être une apprentisse rapide et je suis toujours prêt a relever de nouveaux défis pour aider mon équipe et mon entreprise a réussir.<br /><br />Je vous remerci de considerer ma candidature. J'attends avec impatience l'opportunité de discuter de la manière dont mon expérience et mes compétences peuvent bénéficier a votre entreprise.<br /><br />Sincèrement,<br /><br />Candidat`,
	Arabic: `عزيزي تاداس،<br /><br />أنا متحمس جداً للتقدم لوظيفة المساعد في شركتك. كشخص يهتم بالتفاصيل بشكل طبيعي ويزدهر في بيئة سريعة الخطى، أنا واثق من أنني يمكن أن أكون إضافة قيمة لفريقك.<br /><br />لقد طوّرت مهاراتي التنظيمية والتواصل من خلال الخبرات السابقة في العمل، حيث تعلمت كيفية ترتيب المهام، وإدارة عدة مشاريع في نفس الوقت، والحفاظ على مستوى عالٍ من الدقة في عملي. أنا أيضًا ماهر في استخدام برامج الكمبيوتر المختلفة، بما في ذلك Microsoft Office و Google Suite وأدوات إدارة المشاريع، والتي أنا متأكد ستكون مفيدة في هذا الدور.<br /><br />أنا متحمس حقًا لفرصة العمل في بيئة تعاونية حيث يمكنني تطبيق مهاراتي لتوفير الدعم الشامل للفريق. أنا أفتخر بأنني أتعلم بسرعة، وأنا دائمًا مستعد للتحديات الجديدة لمساعدة فريقي وشركتي على النجاح.<br /><br />شكرا لك على النظر في طلبي. أتطلع إلى فرصة لمناقشة كيف يمكن لخبرتي ومهاراتي أن تفيد شركتك.<br /><br />مع خالص التحية،<br /><br />المْتَقَدَّمْ`,
	Mandarin: `敬爱的 Tadas 先生：<br /><br />我非常爱申请您公司的助理职位。作为一个自然非常喜欢细节的人，也能够适应快节奏的环境，我非常有自信可以成为您团队中的一员。<br /><br />以前的工作经验让我提高了自己的组织和交流技能，学会了如何优先处理任务，在同一时间完成多个项目，并保持高水平的工作准确性。我也熟练使用多种软件程序，包括 Microsoft Office、Google Suite 和项目管理工具，这些肯定会在这个职位中很有用。<br /><br />我非常兴奋可以在协作环境中工作，这样我就可以运用我的技能为团队提供全面的支持。我自己是一个快速的学习者，我总是乐于接受新的挑战，以帮助我的团队和公司取得成功。<br /><br />感谢您考虑我的申请，我期待着有机会讨论我的经验和技能如何可以使您的公司受益。<br /><br />真诚地，<br /><br />申请人`,
	Hindi: `आदर्श श्रीमती/श्री,<br /><br />मैं अपने व्यावसायिक अनुभवों के आधार पर अपना दावा जताना चाहता हूँ कि मैं आपके संगठन में एक मूल्यवान संसाधन हो सकता हूँ। मैंने अपने पूर्व काम के दौरान अपने व्यक्तिगत कौशल बढ़ाने के लिए कठिन परिस्थितियों का सामना किया है, जिससे मैंने काम में उच्च स्तर की शुद्धता और अंतर्निहित संचार कौशल विकसित किए हैं।<br /><br />मुझे एक स्वयंसेवी और सहयोगी वातावरण में काम करने का अवसर मिलेगा, जहाँ मैं अपने संगठनात्मक और प्रबंधन कौशलों का उपयोग करते हुए अपने बाहर के संबंधित कामों को संभालने में सक्षम हो सकता हूँ। मैं इस संगठन में काम करने के लिए बेहद उत्सुक हूँ और मुझे आपके समय और ध्यान के लिए आभारी हूँ।<br /><br />यदि आपको मेरा विवरण अधिक जानकारी देने के लिए उपयुक्त लगता है तो कृपया मुझसे संपर्क करें। मैं आपके उत्तर की प्रतीक्षा करूंगा।<br /><br />धन्यवाद,<br />आपका आवेदक`,
};

const buttons = document.querySelectorAll(".cl-button");
buttons.forEach((button) => {
	button.addEventListener("click", () => {
		buttons.forEach((button) => button.classList.remove("selected"));
		button.classList.add("selected");

		const buttonText = button.textContent;
		const candidateAText = candidateATexts[buttonText];
		const candidateBText = candidateBTexts[buttonText];

		const aTextElement = document.querySelector(".cl-letter-text");
		aTextElement.innerHTML = candidateAText;

		const bTextElement = document.querySelectorAll(".cl-letter-text")[1];
		bTextElement.innerHTML = candidateBText;
	});
});