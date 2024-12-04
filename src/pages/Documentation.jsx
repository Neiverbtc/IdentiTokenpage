import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { Card } from '../components/ui/Card'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const categories = {
  Overview: [
    {
      id: 1,
      title: 'Project Description',
      content: `IdentiToken is a decentralized identity verification and reward system built on blockchain technology. 
                It enables users to verify their identity, earn tokens through various activities, and participate in a 
                decentralized identity ecosystem.`
    },
    {
      id: 2,
      title: 'Token Economics',
      content: `• Initial Supply: 10,000,000 IDT
                • Verification Reward: 100 IDT
                • Activity Rewards: 1-50 IDT per action
                • Daily Reward Limit: 1,000 IDT
                • Reward Cooldown: 24 hours`
    }
  ],
  Features: [
    {
      id: 1,
      title: 'Identity Verification',
      content: `• One-time verification process
                • Authorized verifiers validate identity
                • Automatic reward distribution
                • Multi-level verification system`
    },
    {
      id: 2,
      title: 'Activity Tracking',
      content: `• DID Queries tracking
                • DID Updates monitoring
                • Cumulative statistics
                • Real-time metrics`
    },
    {
      id: 3,
      title: 'Reward System',
      content: `• Verification rewards (one-time)
                • Activity-based rewards (recurring)
                • Daily limits and cooldowns
                • Anti-abuse mechanisms`
    }
  ],
  Security: [
    {
      id: 1,
      title: 'Protection Mechanisms',
      content: `• Circuit breaker functionality
                • Flash loan protection
                • Rate limiting
                • Access control system`
    },
    {
      id: 2,
      title: 'Validators',
      content: `• Base validation layer
                • Reward validation
                • Token operation validation
                • Multi-level security checks`
    }
  ],
  Contracts: [
    {
      id: 1,
      title: 'Core Contracts',
      content: `• IdentiToken (ERC20): 0x1944e80C2AB93146b4dd2Ea190aED293B9Da3301
                • IdentityVerificationManager: 0x1af6159aB377f6d340cF62d602b95BbEc0165102
                • ActivityTracker: 0xDED1775c51bbb2c195539599f07fD50a5d799E4a
                • RewardDistributor: 0x0494E484c068495029A9265F0E97A5D23Ac1FfAC`
    }
  ]
}

export default function Documentation() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="w-full px-2 py-16 sm:px-0">
      <Card title="Documentation">
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow text-blue-700'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <div className="space-y-8">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="relative rounded-md p-3 hover:bg-gray-50"
                    >
                      <h3 className="text-sm font-medium leading-5 text-gray-900">
                        {post.title}
                      </h3>

                      <div className="mt-1 text-sm text-gray-500 whitespace-pre-line">
                        {post.content}
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </Card>
    </div>
  )
}