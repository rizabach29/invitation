import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface CountdownTimerProps {
  weddingDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function AnimatedDigit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden h-12 sm:h-14 w-14 sm:w-16">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -40, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: 40, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0, 1] }}
            className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-serif font-bold text-charcoal tabular-nums"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-charcoal/40 mt-1">
        {label}
      </span>
    </div>
  )
}

function Separator() {
  return (
    <motion.span
      animate={{ opacity: [0.2, 0.6, 0.2] }}
      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      className="text-2xl font-serif text-gold/50 self-start mt-2"
    >
      :
    </motion.span>
  )
}

export function CountdownTimer({ weddingDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculate = () => {
      const distance = new Date(weddingDate).getTime() - Date.now()
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / 1000 / 60) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        })
      }
    }
    calculate()
    const timer = setInterval(calculate, 1000)
    return () => clearInterval(timer)
  }, [weddingDate])

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5">
      <AnimatedDigit value={timeLeft.days} label="Days" />
      <Separator />
      <AnimatedDigit value={timeLeft.hours} label="Hours" />
      <Separator />
      <AnimatedDigit value={timeLeft.minutes} label="Min" />
      <Separator />
      <AnimatedDigit value={timeLeft.seconds} label="Sec" />
    </div>
  )
}
