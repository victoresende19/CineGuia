import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Select from 'react-select';
import './App.css'

const App: React.FC = () => {
  const [optionList, setOptionList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [recommendation, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOptionsLoading, setIsOptionsLoading] = useState(true); // Novo estado
  const [error, setError] = useState<string | null>(null); // Novo estado para controlar os erros


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleGenerateRecommendations = async () => {
    if (!selectedOption) {
      alert('Por favor, selecione um filme antes de gerar recomendações.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      let res = await axios.get(`https://cineguia-400223.uk.r.appspot.com/movie_predict_grouped/${selectedOption}`);
      setRecommendations(res.data.movies);
    } catch (error) {
      try {
        let res = await axios.get(`https://cineguia-400223.uk.r.appspot.com/movie_predict_grouped/${selectedOption}`);
        setRecommendations(res.data.movies);
      } catch (err) {
        setError('Erro ao procurar, tente novamente');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchData = () => {
    axios.get('https://cineguia-400223.uk.r.appspot.com/movies_list/')
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          setOptionList(data.movies);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsOptionsLoading(false)); // Atualiza o estado quando os dados são carregados
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <html lang="en" >
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
        />
        <link
          href="https://unpkg.com/@tailwindcss/custom-forms/dist/custom-forms.min.css"
          rel="stylesheet"
        />

        <style>
          {`@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

          html {
            font-family: "Poppins", -apple-system,
              BlinkMacSystemFont, "Segoe UI", Roboto,
              "Helvetica Neue", Arial, "Noto Sans",
              sans-serif, "Apple Color Emoji",
              "Segoe UI Emoji", "Segoe UI Symbol",
              "Noto Color Emoji";
          }`}
        </style>
      </head>

      <body className="leading-normal tracking-normal text-indigo-400 m-6 bg-cover bg-fixed">
        <div className="h-full">
          <div className="w-full container mx-auto">
            <div className="w-full flex items-center justify-between">
              <a
                className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                href="#"
              >
                Cine<span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                  Guia
                </span>
              </a>
              <div className="flex w-1/2 justify-end content-center">
                <a
                  className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-right h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                >
                  Acesse as redes sociais:
                </a>
                <a
                  className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-right h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                  href="https://github.com/victoresende19"
                  target="_blank"
                >
                  <BsGithub />
                </a>
                <a
                  className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-right h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                  href="https://www.linkedin.com/in/victor-resende-508b75196/"
                  target="_blank"
                >
                  <BsLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
              <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                  CineGuia
                </span>
              </h1>
              <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                Sua plataforma para recomendação de filmes!
              </p>
              <form className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label className="block text-blue-300 py-2 font-bold mb-2" htmlFor="emailaddress">
                    Escolha um filme para gerar recomendações parecidas. Para pesquisa, utilize o título em inglês
                  </label>
                  <div className="relative">
                    <Select
                      options={optionList.map(movie => ({ value: movie, label: movie }))}
                      value={selectedOption ? { value: selectedOption, label: selectedOption } : { value: '', label: 'Selecione ou digite um filme' }}
                      onChange={(selectedOption: any) => setSelectedOption(selectedOption ? selectedOption.value : '')}
                      isDisabled={isOptionsLoading}
                      isLoading={isOptionsLoading}
                      placeholder="Selecione um filme"
                      isClearable={true}
                      isSearchable={true}
                    />

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12l-4-4h8z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <button
                      className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                      type="button"
                      onClick={handleGenerateRecommendations}
                      disabled={loading}
                    >
                      Gerar recomendações
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="border-rose-600 w-full xl:w-3/5 p-12 overflow-hidden relative">
              {loading ? (
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {error ? (
                    <div className="text-center text-red-500 font-bold">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 text-3xl">
                        {error}
                      </span>
                    </div>
                  ) : (
                    <>
                      {recommendation.length > 0 && (
                        <div style={{
                          backgroundImage: 'url("https://images.emojiterra.com/google/noto-emoji/unicode-15/animated/1f37f.gif")',
                          backgroundSize: 'auto 200px',
                          backgroundPosition: '100% 100%',
                          backgroundRepeat: 'no-repeat',
                        }} className="gif-background">
                          <div className="text-center">
                            <p className="my-4 text-3xl md:text-5xl text-white font-bold leading-tight">
                              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                                Outros filmes parecidos com o escolhido são:
                              </span>
                            </p>
                            <ul className="mx-auto w-full md:w-2/5 transform transition hover:scale-105 duration-700 ease-in-out hover:rotate-6 text-white text-xl text-left">
                              {recommendation.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
              <a className="text-gray-500 no-underline hover:no-underline" href="#">&copy; 2023 </a>
              - Victor Augusto Souza Resende
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default App;
