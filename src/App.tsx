import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  RotateCcw,
  Trophy,
  Clock,
  Utensils,
  Delete,
  Sparkles,
  Keyboard,
  Smartphone,
} from 'lucide-react';

// ==========================================
// 1. 食べ物のお題データ（100種類）
// ==========================================
interface FoodItem {
  kanji: string;
  kana: string;
  emoji: string;
}

const FOOD_LIST: FoodItem[] = [
  { kanji: 'チーズカレー', kana: 'ちーずかれー', emoji: '🍛' },
  { kanji: '牛丼', kana: 'ぎゅうどん', emoji: '🥩' },
  { kanji: 'カルボナーラ', kana: 'かるぼなーら', emoji: '🍝' },
  { kanji: 'トマトシチュー', kana: 'とまとしちゅー', emoji: '🍲' },
  { kanji: '生姜焼き肉定食', kana: 'しょうがやきにくていしょく', emoji: '🍱' },
  { kanji: 'オムライス', kana: 'おむらいす', emoji: '🍳' },
  { kanji: 'ハンバーグ定食', kana: 'はんばーぐていしょく', emoji: '🍽️' },
  { kanji: '味噌ラーメン', kana: 'みそらーめん', emoji: '🍜' },
  { kanji: '醤油ラーメン', kana: 'しょうゆらーめん', emoji: '🍜' },
  { kanji: 'とんこつラーメン', kana: 'とんこつらーめん', emoji: '🍜' },
  { kanji: 'チャーハン', kana: 'ちゃーはん', emoji: '🍚' },
  { kanji: '焼き餃子', kana: 'やきぎょうざ', emoji: '🥟' },
  { kanji: 'エビチリ', kana: 'えびちり', emoji: '🦐' },
  { kanji: '麻婆豆腐', kana: 'まーぼーどうふ', emoji: '🌶️' },
  { kanji: '青椒肉絲', kana: 'ちんじゃおろーす', emoji: '🫑' },
  { kanji: '天津飯', kana: 'てんしんはん', emoji: '🥚' },
  { kanji: '親子丼', kana: 'おやこどん', emoji: '🐔' },
  { kanji: 'カツ丼', kana: 'かつどん', emoji: '🐷' },
  { kanji: '天丼', kana: 'てんどん', emoji: '🍤' },
  { kanji: '海鮮丼', kana: 'かいせんどん', emoji: '🐟' },
  { kanji: 'うな重', kana: 'うなじゅう', emoji: '🍱' },
  { kanji: '唐揚げ定食', kana: 'からあげていしょく', emoji: '🍗' },
  { kanji: 'とんかつ定食', kana: 'とんかつていしょく', emoji: '🥩' },
  { kanji: 'チキン南蛮', kana: 'ちきんなんばん', emoji: '🍗' },
  { kanji: 'サバの味噌煮', kana: 'さばのみそに', emoji: '🐟' },
  { kanji: '焼き鮭定食', kana: 'やきざけていしょく', emoji: '🐟' },
  { kanji: '肉じゃが', kana: 'にくじゃが', emoji: '🥔' },
  { kanji: 'コロッケ', kana: 'ころっけ', emoji: '🥔' },
  { kanji: 'メンチカツ', kana: 'めんちかつ', emoji: '🥩' },
  { kanji: 'ロールキャベツ', kana: 'ろーるきゃべつ', emoji: '🥬' },
  { kanji: 'ビーフシチュー', kana: 'びーふしちゅー', emoji: '🍲' },
  { kanji: 'クリームシチュー', kana: 'くりーむしちゅー', emoji: '🥣' },
  { kanji: 'ポトフ', kana: 'ぽとふ', emoji: '🥕' },
  { kanji: 'グラタン', kana: 'ぐらたん', emoji: '🧀' },
  { kanji: 'ドリア', kana: 'どりあ', emoji: '🥘' },
  { kanji: 'ラザニア', kana: 'らざにあ', emoji: '🍝' },
  { kanji: 'ペペロンチーノ', kana: 'ぺぺろんちーの', emoji: '🍝' },
  { kanji: 'ミートソース', kana: 'みーとそーす', emoji: '🍝' },
  { kanji: 'ナポリタン', kana: 'なぽりたん', emoji: '🍝' },
  { kanji: 'たらこスパゲッティ', kana: 'たらこすぱげってぃ', emoji: '🍝' },
  { kanji: 'マルゲリータピザ', kana: 'まるげりーたぴざ', emoji: '🍕' },
  { kanji: '照り焼きチキンピザ', kana: 'てりやきちきんぴざ', emoji: '🍕' },
  { kanji: 'チーズバーガー', kana: 'ちーずばーがー', emoji: '🍔' },
  { kanji: 'てりやきバーガー', kana: 'てりやきばーがー', emoji: '🍔' },
  { kanji: 'ホットドッグ', kana: 'ほっとどっぐ', emoji: '🌭' },
  { kanji: 'サンドイッチ', kana: 'さんどいっち', emoji: '🥪' },
  { kanji: 'カツサンド', kana: 'かつさんど', emoji: '🥪' },
  { kanji: 'フレンチトースト', kana: 'ふれんちとーすと', emoji: '🍞' },
  { kanji: 'パンケーキ', kana: 'ぱんけーき', emoji: '🥞' },
  { kanji: 'ワッフル', kana: 'わっふる', emoji: '🧇' },
  { kanji: 'クロワッサン', kana: 'くろわっさん', emoji: '🥐' },
  { kanji: 'カレーパン', kana: 'かれーぱん', emoji: '🥖' },
  { kanji: 'メロンパン', kana: 'めろんぱん', emoji: '🍈' },
  { kanji: 'あんぱん', kana: 'あんぱん', emoji: '🍞' },
  { kanji: 'クリームパン', kana: 'くりーむぱん', emoji: '🥐' },
  { kanji: '焼きそば', kana: 'やきそば', emoji: '🥡' },
  { kanji: 'お好み焼き', kana: 'おこのみやき', emoji: '🥞' },
  { kanji: 'たこ焼き', kana: 'たこやき', emoji: '🐙' },
  { kanji: 'もんじゃ焼き', kana: 'もんじゃやき', emoji: '🥘' },
  { kanji: 'きつねうどん', kana: 'きつねうどん', emoji: '🍲' },
  { kanji: 'たぬきそば', kana: 'たぬきそば', emoji: '🍜' },
  { kanji: '天ぷらそば', kana: 'てんぷらそば', emoji: '🍤' },
  { kanji: 'カレーうどん', kana: 'かれーうどん', emoji: '🍛' },
  { kanji: '冷やし中華', kana: 'ひやしちゅうか', emoji: '🥒' },
  { kanji: 'そうめん', kana: 'そうめん', emoji: '🥢' },
  { kanji: 'ざるそば', kana: 'ざるそば', emoji: '🥢' },
  { kanji: 'まぐろの握り', kana: 'まぐろのにぎり', emoji: '🍣' },
  { kanji: 'サーモン寿司', kana: 'さーもんずし', emoji: '🍣' },
  { kanji: 'いくら軍艦', kana: 'いくらぐんかん', emoji: '🍣' },
  { kanji: 'たまご寿司', kana: 'たまごずし', emoji: '🍣' },
  { kanji: 'かっぱ巻き', kana: 'かっぱまき', emoji: '🥒' },
  { kanji: '鉄火巻き', kana: 'てっかまき', emoji: '🍣' },
  { kanji: 'いなり寿司', kana: 'いなりずし', emoji: '🦊' },
  { kanji: 'ちらし寿司', kana: 'ちらしずし', emoji: '🍱' },
  { kanji: 'おにぎり', kana: 'おにぎり', emoji: '🍙' },
  { kanji: 'お茶漬け', kana: 'おちゃづけ', emoji: '🍵' },
  { kanji: '雑炊', kana: 'ぞうすい', emoji: '🍲' },
  { kanji: 'すき焼き', kana: 'すきやき', emoji: '🥩' },
  { kanji: 'しゃぶしゃぶ', kana: 'しゃぶしゃぶ', emoji: '🥬' },
  { kanji: 'もつ鍋', kana: 'もつなべ', emoji: '🍲' },
  { kanji: 'キムチ鍋', kana: 'きむちなべ', emoji: '🌶️' },
  { kanji: 'おでん', kana: 'おでん', emoji: '🍢' },
  { kanji: '焼き鳥', kana: 'やきとり', emoji: '🍢' },
  { kanji: '串カツ', kana: 'くしかつ', emoji: '🍢' },
  { kanji: '枝豆', kana: 'えだまめ', emoji: '🫛' },
  { kanji: '冷奴', kana: 'ひややっこ', emoji: '🧊' },
  { kanji: 'ポテトサラダ', kana: 'ぽてとさらだ', emoji: '🥗' },
  { kanji: 'シーザーサラダ', kana: 'しーざーさらだ', emoji: '🥗' },
  { kanji: 'コーンスープ', kana: 'こーんすーぷ', emoji: '🌽' },
  { kanji: '味噌汁', kana: 'みそしる', emoji: '🥣' },
  { kanji: '豚汁', kana: 'とんじる', emoji: '🐷' },
  { kanji: 'ショートケーキ', kana: 'しょーとけーき', emoji: '🍰' },
  { kanji: 'チーズケーキ', kana: 'ちーずけーき', emoji: '🧀' },
  { kanji: 'チョコレートパフェ', kana: 'ちょこれーとぱふぇ', emoji: '🍨' },
  { kanji: 'プリンアラモード', kana: 'ぷりんあらもーど', emoji: '🍮' },
  { kanji: 'シュークリーム', kana: 'しゅーくりーむ', emoji: '🥯' },
  { kanji: 'アップルパイ', kana: 'あっぷるぱい', emoji: '🥧' },
  { kanji: 'ティラミス', kana: 'てぃらみす', emoji: '☕' },
  { kanji: '抹茶アイス', kana: 'まっちゃあいす', emoji: '🍨' },
  { kanji: 'いちご大福', kana: 'いちごだいふく', emoji: '🍓' },
];

// ==========================================
// 2. フリック入力＆濁点・小文字変換ロジック
// ==========================================
type Direction = 'center' | 'left' | 'up' | 'right' | 'down';

interface FlickKey {
  id: string;
  label: string;
  chars: Record<Direction, string>;
}

const FLICK_KEYS: FlickKey[] = [
  {
    id: 'a',
    label: 'あ',
    chars: { center: 'あ', left: 'い', up: 'う', right: 'え', down: 'お' },
  },
  {
    id: 'ka',
    label: 'か',
    chars: { center: 'か', left: 'き', up: 'く', right: 'け', down: 'こ' },
  },
  {
    id: 'sa',
    label: 'さ',
    chars: { center: 'さ', left: 'し', up: 'す', right: 'せ', down: 'そ' },
  },
  {
    id: 'ta',
    label: 'た',
    chars: { center: 'た', left: 'ち', up: 'つ', right: 'て', down: 'と' },
  },
  {
    id: 'na',
    label: 'な',
    chars: { center: 'な', left: 'に', up: 'ぬ', right: 'ね', down: 'の' },
  },
  {
    id: 'ha',
    label: 'は',
    chars: { center: 'は', left: 'ひ', up: 'ふ', right: 'へ', down: 'ほ' },
  },
  {
    id: 'ma',
    label: 'ま',
    chars: { center: 'ま', left: 'み', up: 'む', right: 'め', down: 'も' },
  },
  {
    id: 'ya',
    label: 'や',
    chars: { center: 'や', left: '「', up: 'ゆ', right: '」', down: 'よ' },
  },
  {
    id: 'ra',
    label: 'ら',
    chars: { center: 'ら', left: 'り', up: 'る', right: 'れ', down: 'ろ' },
  },
  {
    id: 'mod',
    label: '゛゜小',
    chars: { center: '゛゜小', left: '', up: '', right: '', down: '' },
  },
  {
    id: 'wa',
    label: 'わ',
    chars: { center: 'わ', left: 'を', up: 'ん', right: 'ー', down: '〜' },
  },
  {
    id: 'del',
    label: '⌫',
    chars: { center: '', left: '', up: '', right: '', down: '' },
  },
];

// 濁点・半濁点・小文字の循環変換マップ
const MODIFIER_CYCLE: Record<string, string> = {
  あ: 'ぁ',
  ぁ: 'あ',
  い: 'ぃ',
  ぃ: 'い',
  う: 'ぅ',
  ぅ: 'ゔ',
  ゔ: 'う',
  え: 'ぇ',
  ぇ: 'え',
  お: 'ぉ',
  ぉ: 'お',
  か: 'が',
  が: 'か',
  き: 'ぎ',
  ぎ: 'き',
  く: 'ぐ',
  ぐ: 'く',
  け: 'げ',
  げ: 'け',
  こ: 'ご',
  ご: 'こ',
  さ: 'ざ',
  ざ: 'さ',
  し: 'じ',
  じ: 'し',
  す: 'ず',
  ず: 'す',
  せ: 'ぜ',
  ぜ: 'せ',
  そ: 'ぞ',
  ぞ: 'そ',
  た: 'だ',
  だ: 'た',
  ち: 'ぢ',
  ぢ: 'ち',
  つ: 'っ',
  っ: 'づ',
  づ: 'つ',
  て: 'で',
  で: 'て',
  と: 'ど',
  ど: 'と',
  は: 'ば',
  ば: 'ぱ',
  ぱ: 'は',
  ひ: 'び',
  び: 'ぴ',
  ぴ: 'ひ',
  ふ: 'ぶ',
  ぶ: 'ぷ',
  ぷ: 'ふ',
  へ: 'べ',
  べ: 'ぺ',
  ぺ: 'へ',
  ほ: 'ぼ',
  ぼ: 'ぽ',
  ぽ: 'ほ',
  や: 'ゃ',
  ゃ: 'や',
  ゆ: 'ゅ',
  ゅ: 'ゆ',
  よ: 'ょ',
  ょ: 'よ',
  わ: 'ゎ',
  ゎ: 'わ',
};

// インデックス配列をFisher-Yatesアルゴリズムで安全にシャッフル（whileループ不使用）
function createShuffledDeck(length: number): number[] {
  const deck = Array.from({ length }, (_, i) => i);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}

// ==========================================
// 3. メインコンポーネント
// ==========================================
export default function App() {
  // ゲーム状態: 'start' | 'playing' | 'result'
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>(
    'start'
  );
  const [score, setScore] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);

  // シャッフル済み出題デッキと現在位置
  const deckRef = useRef<number[]>(createShuffledDeck(FOOD_LIST.length));
  const deckCursorRef = useRef<number>(0);

  // お題と入力状態
  const [currentFood, setCurrentFood] = useState<FoodItem>(FOOD_LIST[0]);
  const [typedText, setTypedText] = useState<string>('');
  const [justCompleted, setJustCompleted] = useState<boolean>(false);

  // 最新の状態をイベント関数内から安全に参照するためのRef
  const currentFoodRef = useRef<FoodItem>(FOOD_LIST[0]);
  const gameStateRef = useRef<'start' | 'playing' | 'result'>('start');
  const justCompletedRef = useRef<boolean>(false);
  const typedTextRef = useRef<string>('');
  const advanceTimerRef = useRef<number | null>(null);

  // フリック操作状態
  const [activeKey, setActiveKey] = useState<FlickKey | null>(null);
  const [flickDir, setFlickDir] = useState<Direction>('center');
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // PCキーボード入力用hidden input
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isComposingRef = useRef<boolean>(false);

  // 状態同期ヘルパー
  const syncGameState = (next: 'start' | 'playing' | 'result') => {
    gameStateRef.current = next;
    setGameState(next);
  };

  const syncJustCompleted = (next: boolean) => {
    justCompletedRef.current = next;
    setJustCompleted(next);
  };

  const syncCurrentFood = (food: FoodItem) => {
    currentFoodRef.current = food;
    setCurrentFood(food);
  };

  // 入力欄の完全クリア（State・Ref・DOMのすべてを同期クリア）
  const clearAllInput = useCallback(() => {
    typedTextRef.current = '';
    setTypedText('');
    isComposingRef.current = false;
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  // カタカナ→ひらがな正規化
  const toHiragana = (str: string) =>
    str.replace(/[\u30a1-\u30f6]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) - 0x60)
    );

  // デッキから次の食品をO(1)で取得（無限ループしないインデックス指定方式）
  const drawNextFood = useCallback((): FoodItem => {
    if (deckCursorRef.current >= deckRef.current.length) {
      deckRef.current = createShuffledDeck(FOOD_LIST.length);
      deckCursorRef.current = 0;
    }
    const foodIndex = deckRef.current[deckCursorRef.current];
    deckCursorRef.current += 1;
    return FOOD_LIST[foodIndex];
  }, []);

  // タイマーのクリーンアップ
  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  // アンマウント時のタイマー掃除
  useEffect(() => {
    return () => {
      clearAdvanceTimer();
    };
  }, [clearAdvanceTimer]);

  // ゲーム開始
  const startGame = () => {
    clearAdvanceTimer();
    deckRef.current = createShuffledDeck(FOOD_LIST.length);
    deckCursorRef.current = 0;

    const firstFood = drawNextFood();
    syncCurrentFood(firstFood);
    clearAllInput();

    setScore(0);
    setCompletedCount(0);
    setTimeLeft(60);
    syncJustCompleted(false);
    syncGameState('playing');

    window.setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    }, 30);
  };

  // 制限時間60秒カウントダウンタイマー
  useEffect(() => {
    if (gameState !== 'playing') return;
    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          clearAdvanceTimer();
          syncGameState('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [gameState, clearAdvanceTimer]);

  // ==========================================
  // 正解判定を含む唯一の同期入力更新関数（handleInputUpdate）
  // ==========================================
  const handleInputUpdate = useCallback(
    (nextRawText: string, syncDomInput: boolean) => {
      if (gameStateRef.current !== 'playing' || justCompletedRef.current) {
        return;
      }

      const normalized = toHiragana(nextRawText);
      typedTextRef.current = normalized;
      setTypedText(normalized);

      if (syncDomInput && inputRef.current && !isComposingRef.current) {
        inputRef.current.value = normalized;
      }

      // 変換確定中（IME未確定）は正解確定判定を保留
      if (isComposingRef.current) {
        return;
      }

      // 正解判定（入力文字列がお題のひらがなと完全一致したら同期的に1回だけ実行）
      if (normalized.length > 0 && normalized === currentFoodRef.current.kana) {
        clearAdvanceTimer();
        syncJustCompleted(true);
        setScore((prev) => prev + 10);
        setCompletedCount((prev) => prev + 1);

        // 入力欄を即座にクリア
        clearAllInput();

        // 短い正解演出のあと次の問題へ確実に移行
        advanceTimerRef.current = window.setTimeout(() => {
          advanceTimerRef.current = null;
          if (gameStateRef.current !== 'playing') return;

          const nextFood = drawNextFood();
          syncCurrentFood(nextFood);
          clearAllInput();
          syncJustCompleted(false);

          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 180);
      }
    },
    [clearAdvanceTimer, clearAllInput, drawNextFood]
  );

  // フリックキーボードからの入力ハンドラ
  const handleFlickInput = (key: FlickKey, dir: Direction) => {
    if (gameStateRef.current !== 'playing' || justCompletedRef.current) return;
    inputRef.current?.focus();

    // 画面のフリックキーを押した時点でIME変換フラグをリセット
    isComposingRef.current = false;

    if (key.id === 'del') {
      const next = typedTextRef.current.slice(0, -1);
      handleInputUpdate(next, true);
      return;
    }

    if (key.id === 'mod') {
      const current = typedTextRef.current;
      if (!current) return;
      const lastChar = current.slice(-1);
      const converted = MODIFIER_CYCLE[lastChar];
      if (converted) {
        const next = current.slice(0, -1) + converted;
        handleInputUpdate(next, true);
      }
      return;
    }

    const charToAdd = key.chars[dir] || key.chars.center;
    if (charToAdd) {
      const next = typedTextRef.current + charToAdd;
      handleInputUpdate(next, true);
    }
  };

  // ポインター（タッチ・マウス両対応）でのフリック判定
  const onPointerDown = (e: React.PointerEvent, key: FlickKey) => {
    e.preventDefault();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setActiveKey(key);
    setFlickDir('center');
    touchStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!activeKey || !touchStartRef.current) return;
    if (activeKey.id === 'del' || activeKey.id === 'mod') return;

    const dx = e.clientX - touchStartRef.current.x;
    const dy = e.clientY - touchStartRef.current.y;
    const threshold = 22;

    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
      setFlickDir('center');
    } else if (Math.abs(dx) > Math.abs(dy)) {
      setFlickDir(dx < 0 ? 'left' : 'right');
    } else {
      setFlickDir(dy < 0 ? 'up' : 'down');
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!activeKey) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    handleFlickInput(activeKey, flickDir);
    setActiveKey(null);
    setFlickDir('center');
    touchStartRef.current = null;
  };

  // PCキーボードからの直接入力サポート
  const handlePhysicalInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (gameStateRef.current !== 'playing' || justCompletedRef.current) {
      e.target.value = '';
      return;
    }
    handleInputUpdate(e.target.value, false);
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    isComposingRef.current = false;
    if (gameStateRef.current !== 'playing' || justCompletedRef.current) {
      e.currentTarget.value = '';
      clearAllInput();
      return;
    }
    const normalized = toHiragana(e.currentTarget.value);
    e.currentTarget.value = normalized;
    handleInputUpdate(normalized, false);
  };

  // 入力文字の一致状況（一文字ずつ色分け表示用）
  const renderTargetKana = () => {
    const targetChars = currentFood.kana.split('');
    const inputChars = typedText.split('');

    return (
      <div className="flex flex-wrap justify-center gap-0.5 text-xl sm:text-2xl font-bold tracking-wider">
        {targetChars.map((char, idx) => {
          let colorClass = 'text-slate-400';
          if (idx < inputChars.length) {
            if (inputChars[idx] === char) {
              colorClass = 'text-sky-600 scale-105';
            } else {
              colorClass = 'text-rose-500 underline decoration-wavy';
            }
          } else if (idx === inputChars.length) {
            colorClass = 'text-slate-700 bg-sky-100 px-1 rounded animate-pulse';
          }
          return (
            <span
              key={idx}
              className={`transition-all duration-100 ${colorClass}`}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className="polka-dot-bg min-h-screen w-full flex flex-col items-center justify-between p-2 sm:p-4 select-none overflow-x-hidden font-sans"
      style={{
        backgroundColor: '#e0f2fe',
        backgroundImage: `
          radial-gradient(#7dd3fc 22%, transparent 23%),
          radial-gradient(#bae6fd 22%, transparent 23%)
        `,
        backgroundSize: '48px 48px',
        backgroundPosition: '0 0, 24px 24px',
      }}
    >
      {/* ヘッダーバー（中央揃え） */}
      <header className="w-full max-w-md flex items-center justify-center bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-sky-500 text-white p-1.5 rounded-xl shadow-sm">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-sky-900 leading-tight">
              もぐもぐフリック！
            </h1>
            <p className="text-[11px] text-sky-600 font-medium">
              食品100種・60秒チャレンジ
            </p>
          </div>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="w-full max-w-md flex-1 flex flex-col justify-center my-2">
        {/* ================= スタート画面 ================= */}
        {gameState === 'start' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-sky-200 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 text-white shadow-lg mx-auto text-4xl">
              🍛
            </div>

            <div className="space-y-2">
              <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1 rounded-full">
                iPhone / Android / PC 対応
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                食品フリックゲーム
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                チーズカレー、牛丼、カルボナーラなど
                <br />
                美味しい料理名が
                <span className="font-bold text-sky-600">全100種類</span>
                ランダム登場！
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-sky-50/80 p-4 rounded-2xl border border-sky-100 text-left">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-sky-500 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-500 font-bold">
                    制限時間
                  </div>
                  <div className="text-sm font-black text-slate-800">60秒</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-500 font-bold">
                    1フレーズ完成
                  </div>
                  <div className="text-sm font-black text-slate-800">
                    +10点 加点
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-98 text-white font-black text-lg rounded-2xl shadow-lg shadow-sky-300/60 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Play className="w-6 h-6 fill-current" />
              ゲームスタート！
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-sky-500" />{' '}
                画面フリック対応
              </span>
              <span className="flex items-center gap-1">
                <Keyboard className="w-3.5 h-3.5 text-sky-500" />{' '}
                PCキーボード対応
              </span>
            </div>
          </div>
        )}

        {/* ================= プレイ画面 ================= */}
        {gameState === 'playing' && (
          <div className="flex flex-col gap-3 w-full">
            {/* スコア＆タイマーバー */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/95 rounded-2xl p-3 shadow-md border border-sky-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock
                    className={`w-5 h-5 ${
                      timeLeft <= 10
                        ? 'text-rose-500 animate-bounce'
                        : 'text-sky-500'
                    }`}
                  />
                  <span className="text-xs font-bold text-slate-500">
                    のこり時間
                  </span>
                </div>
                <span
                  className={`text-2xl font-black tabular-nums ${
                    timeLeft <= 10 ? 'text-rose-600' : 'text-slate-800'
                  }`}
                >
                  {timeLeft}
                  <span className="text-xs ml-0.5">秒</span>
                </span>
              </div>

              <div className="bg-white/95 rounded-2xl p-3 shadow-md border border-sky-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span className="text-xs font-bold text-slate-500">
                    スコア
                  </span>
                </div>
                <span className="text-2xl font-black text-sky-600 tabular-nums">
                  {score}
                  <span className="text-xs ml-0.5 text-slate-500">点</span>
                </span>
              </div>
            </div>

            {/* お題表示カード */}
            <div
              onClick={() => inputRef.current?.focus()}
              className={`bg-white/95 rounded-3xl p-4 sm:p-5 shadow-lg border-2 transition-all duration-150 text-center relative overflow-hidden ${
                justCompleted
                  ? 'border-emerald-400 bg-emerald-50/90 scale-[1.02]'
                  : 'border-sky-300'
              }`}
            >
              {justCompleted && (
                <div className="absolute top-2 right-3 bg-emerald-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow animate-bounce">
                  +10点！
                </div>
              )}

              <div className="text-4xl sm:text-5xl mb-1">
                {currentFood.emoji}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-800 mb-2 tracking-tight">
                {currentFood.kanji}
              </div>

              {/* ふりがなガイド */}
              <div className="mb-3">{renderTargetKana()}</div>

              {/* 現在の入力ボックス */}
              <div
                onClick={() => inputRef.current?.focus()}
                className="bg-sky-50/90 border border-sky-200 rounded-xl px-3 py-2 min-h-[42px] flex items-center justify-center relative cursor-text"
              >
                <span className="text-lg font-bold text-sky-900 tracking-wider">
                  {typedText || (
                    <span className="text-sky-300 text-sm font-normal">
                      下のフリックキーまたはキーボードで入力
                    </span>
                  )}
                </span>
                {/* PCキーボード用隠し入力 */}
                <input
                  ref={inputRef}
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  onChange={handlePhysicalInputChange}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  className="opacity-0 absolute inset-0 w-full h-full"
                  aria-label="ひらがな入力"
                />
              </div>
            </div>

            {/* スマホ・タブレット向け 12キー日本語フリックキーボード */}
            <div className="bg-slate-200/90 backdrop-blur-md p-2 sm:p-2.5 rounded-3xl shadow-xl border border-white/60 relative">
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {FLICK_KEYS.map((key) => {
                  const isActive = activeKey?.id === key.id;
                  const isSpecial = key.id === 'mod' || key.id === 'del';

                  return (
                    <div key={key.id} className="relative">
                      {/* フリック中の十字ガイドポップアップ */}
                      {isActive && !isSpecial && (
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                          <div className="grid grid-cols-3 gap-0.5 bg-slate-800/95 text-white p-1 rounded-xl shadow-2xl border border-sky-400 text-xs font-bold w-24 h-24 items-center justify-items-center">
                            <div />
                            <div
                              className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                                flickDir === 'up'
                                  ? 'bg-sky-500 text-white scale-110'
                                  : 'text-slate-300'
                              }`}
                            >
                              {key.chars.up}
                            </div>
                            <div />
                            <div
                              className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                                flickDir === 'left'
                                  ? 'bg-sky-500 text-white scale-110'
                                  : 'text-slate-300'
                              }`}
                            >
                              {key.chars.left}
                            </div>
                            <div
                              className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                                flickDir === 'center'
                                  ? 'bg-sky-500 text-white scale-110'
                                  : 'text-slate-300'
                              }`}
                            >
                              {key.chars.center}
                            </div>
                            <div
                              className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                                flickDir === 'right'
                                  ? 'bg-sky-500 text-white scale-110'
                                  : 'text-slate-300'
                              }`}
                            >
                              {key.chars.right}
                            </div>
                            <div />
                            <div
                              className={`w-7 h-7 flex items-center justify-center rounded-lg ${
                                flickDir === 'down'
                                  ? 'bg-sky-500 text-white scale-110'
                                  : 'text-slate-300'
                              }`}
                            >
                              {key.chars.down}
                            </div>
                            <div />
                          </div>
                        </div>
                      )}

                      {/* キー本体 */}
                      <button
                        type="button"
                        onPointerDown={(e) => onPointerDown(e, key)}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        style={{ touchAction: 'none' }}
                        className={`w-full h-12 sm:h-14 rounded-2xl font-bold flex flex-col items-center justify-center transition-transform cursor-pointer shadow-sm ${
                          isActive
                            ? 'bg-sky-500 text-white scale-95 shadow-inner'
                            : isSpecial
                            ? 'bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-200'
                            : 'bg-white hover:bg-sky-50 text-slate-800 border border-slate-200/80'
                        }`}
                      >
                        {key.id === 'del' ? (
                          <Delete className="w-5 h-5 text-rose-500" />
                        ) : (
                          <>
                            <span className="text-lg sm:text-xl leading-none">
                              {key.label}
                            </span>
                            {!isSpecial && (
                              <span
                                className={`text-[9px] mt-0.5 tracking-tighter ${
                                  isActive ? 'text-sky-100' : 'text-slate-400'
                                }`}
                              >
                                {key.chars.left}
                                {key.chars.up}
                                {key.chars.right}
                                {key.chars.down}
                              </span>
                            )}
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= リザルト画面 ================= */}
        {gameState === 'result' && (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-sky-300 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 text-amber-500 mx-auto shadow-inner">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <p className="text-sm font-bold text-sky-600 mb-1">
                タイムアップ！
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                結果発表
              </h2>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl p-5 border border-sky-200 space-y-3">
              <div>
                <div className="text-xs font-bold text-slate-500">
                  トータルスコア
                </div>
                <div className="text-5xl font-black text-sky-600 my-1">
                  {score}
                  <span className="text-lg ml-1 text-slate-600">点</span>
                </div>
              </div>
              <div className="pt-2 border-t border-sky-200/70 flex justify-around text-sm">
                <div>
                  <span className="text-slate-500 text-xs block">
                    完食（正解）数
                  </span>
                  <span className="font-black text-slate-800 text-lg">
                    {completedCount} 品
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-xs block">
                    ランク判定
                  </span>
                  <span className="font-black text-amber-600 text-lg">
                    {score >= 150
                      ? '三ツ星シェフ👑'
                      : score >= 80
                      ? 'グルメ達人✨'
                      : '見習いコック🍳'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 active:scale-98 text-white font-black text-lg rounded-2xl shadow-lg shadow-sky-300/60 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              もう一度遊ぶ
            </button>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="text-center text-[11px] text-sky-800/80 font-medium py-1">
        タップ＆フリックでひらがな入力 ・ 濁点/小文字は「゛゜小」キーで切替
      </footer>
    </div>
  );
}
