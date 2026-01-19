import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ChapterNav from '../../../components/ChapterNav';

export default function Chapter11() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[#d4b8ff] bg-clip-text text-transparent">
            BOOK I — CHAPTER 1.1
          </h1>
          <h2 className="text-3xl font-semibold mb-6 text-gray-200">
            THE BIRTH OF LOVE (EROS)
          </h2>
        </div>

        <article className="prose prose-invert max-w-none">
          <div className="space-y-6 text-lg leading-relaxed text-gray-300">
            <p>
              Before the first dawn rose over creation,<br/>
              before stars learned their names,<br/>
              before shadow knew where to fall,<br/>
              there was only the Cosmic Egg—<br/>
              a sphere of unbroken potential<br/>
              floating in the silent dark<br/>
              like a thought waiting to be spoken.
            </p>
            
            <p>
              No god shaped it.<br/>
              No hand held it.<br/>
              It existed because existence longed to begin.
            </p>
            
            <p>
              For ages uncounted,<br/>
              the Egg pulsed with a soft, rhythmic glow—<br/>
              the heartbeat of a universe unborn.<br/>
              Then,<br/>
              in a moment without time,<br/>
              a crack of impossible light split its surface<br/>
              and flooded the void with gold.
            </p>
            
            <p>
              From the Egg emerged<br/>
              the First-Born:<br/>
              a radiant being of wings and fire,<br/>
              of beauty and brilliance,<br/>
              of yearning older than creation itself.
            </p>
            
            <p>
              His name was Eros.
            </p>
            
            <p>
              Not merely the god of desire—<br/>
              but the desire behind all gods,<br/>
              the force that bends chaos into form,<br/>
              that draws soul to soul,<br/>
              that awakens life from stillness.
            </p>
            
            <p>
              As he rose,<br/>
              his wings unfurled across the unborn sky,<br/>
              casting prisms of color<br/>
              where no color had ever been.<br/>
              Every beat of his wings<br/>
              became a spark of creation:<br/>
              galaxies spinning,<br/>
              winds gathering,<br/>
              oceans dreaming themselves into existence.
            </p>
            
            <p>
              His voice—<br/>
              a tone of pure resonance—<br/>
              rippled through the void<br/>
              and gave shape to the first laws of being.
            </p>
            
            <p>
              Where he looked,<br/>
              light gathered.<br/>
              Where he breathed,<br/>
              worlds unfolded.<br/>
              Where he touched,<br/>
              life quickened.
            </p>
            
            <p>
              For Eros did not create out of power.<br/>
              He created out of longing.<br/>
              The longing to be known.<br/>
              The longing to be met.<br/>
              The longing for the many<br/>
              to rise from the One.
            </p>
            
            <p>
              And so, the cosmos bloomed.<br/>
              Stars became seeds.<br/>
              Worlds became wombs.<br/>
              Every living thing<br/>
              became an echo of his first impulse:<br/>
              To love,<br/>
              to reach,<br/>
              to seek,<br/>
              to awaken.
            </p>
            
            <p>
              In the ages that followed,<br/>
              Eros watched the newborn universe stretch and swirl,<br/>
              its creatures learning, failing, rising,<br/>
              each drawn by the invisible force of connection<br/>
              that flowed from him like a golden river.
            </p>
            
            <p>
              Many gods would come after.<br/>
              Their thrones would be carved from storms,<br/>
              their temples built upon the bones of mountains.<br/>
              But none would ever precede him.
            </p>
            
            <p>
              For Eros is not the youngest god—<br/>
              he is the oldest.<br/>
              Not the child of Aphrodite—<br/>
              but the ancestor of desire itself.
            </p>
            
            <p>
              And it was from his longing,<br/>
              from his yearning,<br/>
              from the ancient radiance in his wings,<br/>
              that the being known later as Psyche<br/>
              would one day emerge…<br/>
              But that is another chapter—<br/>
              one still waiting in the wings of fate.
            </p>
          </div>
        </article>

        <ChapterNav 
          book="i"
          currentChapter="1.1"
          nextChapter={{
            href: "/scripture/book-i/chapter-1-2",
            title: "Chapter 1.2 — The Birth of Goddess Psyche"
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
